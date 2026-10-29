# Log Investigation: Query Examples

Examples for common log search languages. Field names follow a generic convention; replace them with the names in the application profile (`service.name`, `log.level`, `correlation_id`, `error.code`, `message`, `@timestamp`). In production these shapes are registered as named queries in the data broker; run them freely only in test environments.

## 1. All events of one request (correlation id)

KQL:

```
correlation_id : "c-7f3a91"
```

Lucene:

```
correlation_id:"c-7f3a91"
```

ES|QL:

```
FROM logs-*
| WHERE correlation_id == "c-7f3a91"
| SORT @timestamp ASC
| KEEP @timestamp, service.name, log.level, http.response.status_code, event.duration, message
```

## 2. Errors of one service in a window, excluding known noise

KQL (time window set in the time picker):

```
service.name : "redeem-api" and log.level : ("error" or "warn") and not message : "health check*"
```

Lucene:

```
service.name:"redeem-api" AND log.level:(error OR warn) AND NOT message:"health check*"
```

ES|QL:

```
FROM logs-*
| WHERE @timestamp >= "2026-10-21T21:00:00Z" AND @timestamp < "2026-10-21T22:00:00Z"
  AND service.name == "redeem-api" AND log.level IN ("error", "warn")
  AND NOT message LIKE "health check*"
| STATS events = COUNT(*) BY error.code
| SORT events DESC
| LIMIT 20
```

## 3. Failing window vs baseline in one query

ES|QL:

```
FROM logs-*
| WHERE log.level == "error"
  AND ((@timestamp >= "2026-10-21T21:00:00Z" AND @timestamp < "2026-10-21T22:00:00Z")
    OR (@timestamp >= "2026-10-14T21:00:00Z" AND @timestamp < "2026-10-14T22:00:00Z"))
| EVAL window = CASE(@timestamp >= "2026-10-21T00:00:00Z", "failing", "baseline")
| STATS events = COUNT(*) BY service.name, error.code, window
| SORT service.name, error.code, window
```

In KQL or Lucene, run the query from example 2 twice with the two time ranges and compare the counts.

## 4. Rate per minute of one signature

ES|QL:

```
FROM logs-*
| WHERE service.name == "redeem-api" AND error.code == "VOUCHER_ALREADY_USED"
| STATS events = COUNT(*) BY minute = DATE_TRUNC(1 minute, @timestamp)
| SORT minute ASC
```

## 5. Shape of a named query in the data broker

```yaml
id: logs.error_signatures_by_service
store: production-logs
roles: [qc, techlead]
params:
  service: {type: string, allowed_from: application_profile.services}
  from: {type: timestamp}
  to: {type: timestamp, max_range: 24h}
returns: [error_code, message_template, events]   # templates and counts only
masking: [phone, email, card, token, voucher_code]
row_limit: 50
approved_by: techlead-<application>
```

Notes:

- ES|QL needs a recent Elasticsearch version; when it is not available, use KQL or Lucene with aggregations in the UI.
- Keep the time zone explicit (UTC) in every query and in the evidence.
