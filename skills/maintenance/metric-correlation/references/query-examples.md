# Metric Correlation: Query Examples

Examples in PromQL. Metric and label names follow common exporter conventions; replace them with the names in the application profile. In production these shapes are registered as named queries in the data broker; run them freely only in test environments. Use the same step and range for failing and baseline windows.

## Request-level signals

Request rate per service:

```
sum by (service) (rate(http_requests_total{service="redeem-api"}[5m]))
```

Error ratio:

```
sum(rate(http_requests_total{service="redeem-api", status=~"5.."}[5m]))
/
sum(rate(http_requests_total{service="redeem-api"}[5m]))
```

Latency p95 from a histogram:

```
histogram_quantile(0.95,
  sum by (le) (rate(http_request_duration_seconds_bucket{service="redeem-api"}[5m])))
```

## Resource-level signals

CPU utilization per instance:

```
1 - avg by (instance) (rate(node_cpu_seconds_total{mode="idle"}[5m]))
```

Load relative to cores (saturation):

```
node_load5 / count by (instance) (node_cpu_seconds_total{mode="idle"})
```

Container memory against its limit:

```
container_memory_working_set_bytes{container="redeem-api"}
/
container_spec_memory_limit_bytes{container="redeem-api"}
```

Restarts in the last hour:

```
increase(kube_pod_container_status_restarts_total{container="redeem-api"}[1h])
```

Connection pool pending (name depends on the client library):

```
max by (instance) (db_pool_pending_connections{service="redeem-api"})
```

## Baseline comparison

Same query one week earlier:

```
sum(rate(http_requests_total{service="redeem-api", status=~"5.."}[5m] offset 1w))
```

Ratio of now to last week:

```
sum(rate(http_requests_total{service="redeem-api"}[5m]))
/
sum(rate(http_requests_total{service="redeem-api"}[5m] offset 1w))
```

## Objective burn rate

For an objective of 99.9 % availability (error budget 0.001):

```
(
  sum(rate(http_requests_total{service="redeem-api", status=~"5.."}[1h]))
  /
  sum(rate(http_requests_total{service="redeem-api"}[1h]))
) / 0.001
```

Repeat with `[6h]` (or the profile's long window) for the long-window burn rate.

## Deploy markers

On Kubernetes, a rollout shows up as a generation change:

```
changes(kube_deployment_status_observed_generation{deployment="redeem-api"}[10m]) > 0
```

When the pipeline publishes its own deploy metric or annotation, prefer that, because it carries the version.
