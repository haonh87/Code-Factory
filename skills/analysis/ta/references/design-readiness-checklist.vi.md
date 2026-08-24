---
language: vi
---

# Checklist mức sẵn sàng cho thiết kế

Reference này bổ sung cho quá trình phân tích driver thông thường của SA và TA. Nó không phải một output
block và không bao giờ được xuất nguyên cả checklist. Chỉ áp dụng mục có trigger xuất hiện trong yêu
cầu, rồi map phát hiện vào các field hiện có và đúng quyền sở hữu: drivers, input_issues, handoff,
verification và stop_condition.

SA và TA dùng cùng một contract. Giữ các bản cùng ngôn ngữ giống nhau từng byte. SA sở hữu concern về
nghiệp vụ, pháp lý, ranh giới hệ thống và thẩm quyền dữ liệu. TA sở hữu concern về quality attribute,
tích hợp, runtime và vận hành. Các output block dùng chung vẫn chỉ chứa góc nhìn của role đang chạy.

## Contract sử dụng

~~~yaml
advisory_by_default: true
emit_only_applicable: true
not_applicable_behavior: omit
blocking_requires_named_authority: true
map_to_existing_output_only: true
downstream_design_authority:
  - "system-design"
  - "architecture-modeling"
~~~

Bỏ qua một mục không áp dụng không có nghĩa là bỏ output block bắt buộc. Nếu bằng chứng thiếu, có tranh
chấp hoặc chưa có owner, ghi vào input_issues và, khi cần quyết định, vào
stop_condition.pushed_to_s03. Một check chỉ trở thành blocking khi blocking_authority nêu rõ
stakeholder concern, ràng buộc, policy đã duyệt hoặc criterion đã chấp nhận và thật sự áp dụng cho work
item này. Checklist chỉ nhận diện nghĩa vụ thiết kế; system-design và architecture-modeling vẫn giữ
thẩm quyền chọn giải pháp và model.

## Các check dùng chung

~~~yaml
checks:
  - id: "DR-C01"
    trigger: "Phạm vi tạo mới, chia sẻ, di chuyển hoặc thay đổi một loại dữ liệu nghiệp vụ."
    owner_lens: "sa"
    concern_or_invariant: "Mỗi loại dữ liệu cần đúng một nơi có thẩm quyền ghi; consumer không được tạo nguồn sự thật cạnh tranh."
    expected_evidence: "Phát biểu hoặc ma trận quyền sở hữu nêu loại dữ liệu, nơi ghi có thẩm quyền, consumer và owner quyết định cho chỗ thiếu."
    handoff: "drivers; input_issues.contested_ownership khi chưa giải quyết; handoff.to_dev và handoff.to_qc"
    verification: "Kiểm mọi loại dữ liệu trong phạm vi có đúng một thẩm quyền ghi và consumer có đường bằng chứng."
    mandatory_when: "Có concern về quyền sở hữu, data contract, policy hoặc criterion nguồn sự thật duy nhất đã được nêu tên."
    blocking_authority: "Data-governance policy được nêu tên, quyết định ownership đã duyệt hoặc criterion nguồn sự thật đã chấp nhận."

  - id: "DR-C02"
    trigger: "Hai hệ thống hoặc team trở lên có thể thay đổi cùng một business object, hoặc chưa xác định được owner."
    owner_lens: "sa"
    concern_or_invariant: "Thẩm quyền ghi có tranh chấp hoặc không có owner phải là issue tường minh, không phải một phân bổ ngầm."
    expected_evidence: "Các claim cạnh tranh, object bị ảnh hưởng, owner quyết định, hạn quyết định và tác động nếu để mở."
    handoff: "input_issues.contested_ownership; stop_condition.pushed_to_s03; handoff.to_dev"
    verification: "Xác nhận mọi object có tranh chấp vẫn được ghi là chưa giải quyết hoặc có quyết định ownership đã duyệt; không tự suy ra bên thắng."
    mandatory_when: "Xung đột có thể đổi ranh giới, nguồn sự thật hoặc acceptance outcome trong phạm vi."
    blocking_authority: "Stakeholder concern được nêu tên, ownership matrix đã duyệt hoặc boundary criterion bị ảnh hưởng."

  - id: "DR-C03"
    trigger: "Một notification, derived view hoặc state nhận bất đồng bộ có thể được dùng để phê duyệt, giữ chỗ, cấp quyền hoặc commit một hành động."
    owner_lens: "ta"
    concern_or_invariant: "Phải phân biệt được thông báo về sự kiện và điểm quyết định có thẩm quyền, gồm cả giả định về độ tươi và lỗi."
    expected_evidence: "Thẩm quyền quyết định, yêu cầu consistency hoặc freshness, hành vi khi lỗi và bằng chứng rằng dữ liệu cũ không âm thầm quyết định."
    handoff: "drivers; handoff.to_dev và handoff.to_qc"
    verification: "Với từng quyết định có hệ quả, xác định state có thẩm quyền và test đường dữ liệu cũ, trễ, lặp hoặc không sẵn sàng."
    mandatory_when: "Có correctness concern, integration contract hoặc decision-integrity criterion đã chấp nhận và được nêu tên."
    blocking_authority: "Correctness constraint được nêu tên, integration contract đã duyệt hoặc decision-integrity criterion đã chấp nhận."

  - id: "DR-C04"
    trigger: "State, tổng số hoặc record đi qua ranh giới hệ thống theo kiểu bất đồng bộ, định kỳ hoặc high-integrity transfer."
    owner_lens: "ta"
    concern_or_invariant: "Xác nhận đã gửi không chứng minh hai bên hội tụ; đối soát cần owner và luật nghiệm thu."
    expected_evidence: "Population hoặc tổng số được so, chu kỳ, tolerance, owner của mismatch, đường sửa và audit evidence được giữ."
    handoff: "drivers; handoff.to_dev, handoff.to_qc và handoff.to_devops khi liên quan vận hành"
    verification: "Thử record thiếu, lặp, trễ và lệch rồi chứng minh khả năng phát hiện, ownership và sửa."
    mandatory_when: "Có accuracy, financial-integrity, audit hoặc cross-system convergence criterion được nêu tên."
    blocking_authority: "Interface contract, reconciliation policy, audit obligation hoặc accuracy criterion đã được duyệt."

  - id: "DR-C05"
    trigger: "Kho báo cáo, phân tích, tìm kiếm, mô phỏng hoặc derived store khác nối với hành vi giao dịch."
    owner_lens: "sa"
    concern_or_invariant: "Derived store không được trở thành thẩm quyền ghi chưa qua review đối với record vận hành."
    expected_evidence: "Phát biểu ranh giới nêu transactional authority, derived consumer, feedback path được phép nếu có và owner của ngoại lệ."
    handoff: "drivers; input_issues.contested_ownership khi chưa rõ; handoff.to_dev và handoff.to_qc"
    verification: "Truy mọi write path từ derived store và xác nhận mọi mutation vận hành quay về qua thẩm quyền đã duyệt."
    mandatory_when: "Có concern về ranh giới dữ liệu, governance policy hoặc criterion không ghi ngược đã chấp nhận."
    blocking_authority: "Data-governance policy được nêu tên, system boundary đã duyệt hoặc no-write-back criterion đã chấp nhận."

  - id: "DR-C06"
    trigger: "Allocation, approval, eligibility, settlement hoặc reservation vận hành có thể dùng dữ liệu báo cáo, phân tích, mô phỏng hoặc đã cũ."
    owner_lens: "ta"
    concern_or_invariant: "Input quyết định cần contract tường minh về thẩm quyền và độ tươi; sự tiện lợi phân tích không được âm thầm thành sự thật vận hành."
    expected_evidence: "Nguồn quyết định, freshness threshold hoặc lý do không có, fallback và kiểm chứng khi input cũ hoặc không sẵn sàng."
    handoff: "drivers; handoff.to_dev và handoff.to_qc"
    verification: "Chạy đường quyết định với derived data cũ, trễ, mâu thuẫn và không sẵn sàng rồi xác nhận fallback đã khai báo."
    mandatory_when: "Có decision-integrity, safety, compliance hoặc consistency criterion được nêu tên."
    blocking_authority: "Operational policy được nêu tên, decision-source contract đã duyệt hoặc correctness criterion đã chấp nhận."

  - id: "DR-C07"
    trigger: "Cùng một metric, score hoặc eligibility measure có tên xuất hiện trong nhiều báo cáo, workflow hoặc quyết định."
    owner_lens: "sa"
    concern_or_invariant: "Một measure dùng chung cần đúng một định nghĩa, owner, version và effective period đã duyệt."
    expected_evidence: "Định nghĩa metric, accountable owner, formula hoặc rule reference, version, effective period và các consumer đã biết."
    handoff: "drivers; handoff.to_ba, handoff.to_dev và handoff.to_qc"
    verification: "So mọi consumer của measure có tên và flag định nghĩa, version hoặc effective date mâu thuẫn."
    mandatory_when: "Có reporting, audit, business-consistency hoặc metric-governance criterion được nêu tên."
    blocking_authority: "Metric-governance policy đã duyệt, accountable metric owner hoặc definition-consistency criterion đã chấp nhận."

  - id: "DR-C08"
    trigger: "Môi trường development, test, training, analytics, support hoặc môi trường khác có thể nhận dữ liệu production cá nhân hoặc nhạy cảm."
    owner_lens: "ta"
    concern_or_invariant: "Ranh giới môi trường phải ngăn việc sao chép không kiểm soát dữ liệu production cá nhân hoặc nhạy cảm."
    expected_evidence: "Data classification, môi trường được phép, luật transformation hoặc synthetic data đã duyệt, access owner, retention và bằng chứng xóa."
    handoff: "drivers; handoff.to_dev, handoff.to_qc và handoff.to_devops"
    verification: "Kiểm data flow giữa các môi trường và test việc copy bị cấm, extract còn lưu và đường bypass bị từ chối hoặc phát hiện."
    mandatory_when: "Có privacy, security, residency hoặc environment-isolation policy được nêu tên."
    blocking_authority: "Privacy hoặc security policy được nêu tên, data-classification rule đã duyệt hoặc environment-isolation criterion đã chấp nhận."

  - id: "DR-C09"
    trigger: "Automation, optimization, scoring hoặc generated advice có thể ảnh hưởng đáng kể tới một người, kết quả tài chính, quyền lợi, an toàn hoặc hành động chịu quản lý."
    owner_lens: "sa"
    concern_or_invariant: "Recommendation có hệ quả vẫn là advisory cho tới khi người có thẩm quyền hoặc quy trình quyết định đã duyệt chấp nhận và để lại audit trail."
    expected_evidence: "Decision owner, điểm review, đường override, yêu cầu giải thích, record phê duyệt và stakeholder bị ảnh hưởng."
    handoff: "drivers; handoff.to_ba, handoff.to_dev và handoff.to_qc"
    verification: "Chứng minh các đường reject, override, advice không sẵn sàng và outcome bị tranh chấp, rồi truy quyết định chịu trách nhiệm cuối cùng."
    mandatory_when: "Có human-oversight, risk, ethics, regulatory hoặc material-decision criterion được nêu tên."
    blocking_authority: "Oversight policy đã duyệt, accountable decision owner được nêu tên hoặc human-approval criterion đã chấp nhận."

  - id: "DR-C10"
    trigger: "Một generated number, score, forecast, recommendation hoặc simulation được trình bày làm bằng chứng."
    owner_lens: "ta"
    concern_or_invariant: "Mọi generated value có hệ quả cần truy được input có thẩm quyền, identity của transformation và độ tươi."
    expected_evidence: "Source identifier, data version hoặc timestamp, transformation hoặc model version, lineage owner và cách tái tạo."
    handoff: "drivers; handoff.to_dev và handoff.to_qc"
    verification: "Chọn output đại diện và tái tạo source, version, transformation, timestamp cùng accountable owner."
    mandatory_when: "Có auditability, explainability, data-lineage hoặc evidence criterion được nêu tên."
    blocking_authority: "Provenance policy đã duyệt, audit obligation hoặc traceability criterion đã chấp nhận."

  - id: "DR-C11"
    trigger: "Điều kiện pháp lý, an toàn, chứng nhận, eligibility, consent hoặc policy chi phối việc có được allocation hay commit hay không."
    owner_lens: "sa"
    concern_or_invariant: "Điều kiện chi phối phải được đánh giá trước khi commit, có owner, effective period và exception authority."
    expected_evidence: "Rule áp dụng, jurisdiction hoặc scope, effective date, decision owner, exception path và hành vi khi hành động bị từ chối."
    handoff: "drivers; handoff.to_ba, handoff.to_dev và handoff.to_qc"
    verification: "Test case đủ điều kiện, không đủ, sắp hết hạn, đã hết hạn, ngoại lệ và boundary-time trước điểm commit."
    mandatory_when: "Có luật, quy định, safety rule, policy đã duyệt hoặc eligibility criterion được nêu tên."
    blocking_authority: "Legal hoặc policy authority được nêu tên, compliance interpretation đã duyệt hoặc eligibility criterion đã chấp nhận."

  - id: "DR-C12"
    trigger: "Một hệ thống, service, workflow, report, interface hoặc manual process được đề xuất thu hồi hay thay thế."
    owner_lens: "sa"
    concern_or_invariant: "Thu hồi đòi hỏi successor có tên cho mọi capability, data obligation, consumer và operational duty trong phạm vi."
    expected_evidence: "Inventory capability và consumer, successor owner, ranh giới migration hoặc coexistence, nghĩa vụ chưa giải quyết và rollback owner."
    handoff: "drivers; input_issues.missing_capability khi chưa đủ; stop_condition.pushed_to_s03; handoff.to_dev"
    verification: "Truy mọi trách nhiệm sắp thu hồi tới successor đã chấp nhận hoặc giữ trạng thái blocking với owner và đường giải quyết."
    mandatory_when: "Có retirement, migration, continuity, audit hoặc capability-coverage criterion được nêu tên."
    blocking_authority: "Decommission policy đã duyệt, capability owner, continuity obligation hoặc retirement criterion đã chấp nhận."

  - id: "DR-C13"
    trigger: "Delivery được chia thành phase, migration, cutover, pilot hoặc rollout wave."
    owner_lens: "sa"
    concern_or_invariant: "Entry và exit gate cần bằng chứng đo được; chỉ có mốc lịch không chứng minh readiness."
    expected_evidence: "Metric, threshold, measurement window, evidence owner, decision authority, rollback condition và dependency chưa giải quyết."
    handoff: "drivers; handoff.to_ba, handoff.to_dev và handoff.to_qc"
    verification: "Tính lại gate từ evidence đã ghi và xác nhận phase sau không thể bắt đầu khi criterion chưa đạt."
    mandatory_when: "Có readiness, migration, release, continuity hoặc phase-exit criterion được nêu tên."
    blocking_authority: "Rollout plan, release policy, accountable gate owner đã duyệt hoặc readiness criterion đã chấp nhận."
~~~

## Câu hỏi driver và handoff

Dùng câu hỏi khi concern định hình kiến trúc nhưng câu trả lời sẽ chọn cơ chế. Ghi invariant và nhu cầu
evidence ngay bây giờ; để lựa chọn cho owner hạ nguồn.

~~~yaml
questions_and_handoffs:
  - id: "DR-Q01"
    trigger: "Nhiều actor đồng thời có thể nhận một tài nguyên không thể chia hoặc outcome loại trừ lẫn nhau."
    question: "Quyết định single-winner có thẩm quyền nằm ở đâu, concurrency invariant nào phải giữ, và actor thua hay retry quan sát kết quả thế nào?"
    destination: "drivers (góc nhìn ta); handoff.to_dev; handoff.to_qc"
    expected_evidence: "Authority có tên, contention scenario, invariant, response expectation, retry behavior và concurrency verification."
    non_selection_guard: "Ghi invariant và nghĩa vụ chứng minh; không chọn cơ chế locking, protocol, persistence hoặc coordination."

  - id: "DR-Q02"
    trigger: "Tiền, regulated total, balance hoặc high-integrity value khác đi qua một ranh giới."
    question: "Đảm bảo nào về accuracy, completeness, cut-off, duplicate và reconciliation quan trọng hơn tính tức thời, và ai chấp nhận mismatch?"
    destination: "drivers (góc nhìn ta); handoff.to_dev; handoff.to_qc; handoff.to_devops khi liên quan vận hành"
    expected_evidence: "Control total, cut-off rule, tolerance, mismatch owner, correction path, audit retention và timeliness objective."
    non_selection_guard: "Nêu yêu cầu integrity và timeliness; không chọn công nghệ batch, messaging, ledger hoặc settlement."

  - id: "DR-Q03"
    trigger: "Một event hoặc notification đi qua ranh giới trust, ownership, privacy hoặc regulatory."
    question: "Payload tối thiểu nào đủ nhận diện fact, và consumer được cấp quyền lấy chi tiết hiện hành bổ sung từ source thế nào?"
    destination: "drivers (góc nhìn ta); handoff.to_dev; handoff.to_qc"
    expected_evidence: "Data classification, field tối thiểu, authorization boundary, source lookup contract, retention và hành vi denied-access."
    non_selection_guard: "Xác định nghĩa vụ minimization và access; không chọn event schema, broker, gateway hoặc retrieval implementation."

  - id: "DR-Q04"
    trigger: "Consumer có thể nhận các fact liên quan bị trễ, nhiều lần hoặc khác thứ tự."
    question: "Ordering scope nào thật sự cần, duplicate identity nào tồn tại, và state transition nào phải an toàn khi replay?"
    destination: "drivers (góc nhìn ta); handoff.to_dev; handoff.to_qc"
    expected_evidence: "Ordering key, duplicate identity, replay scenario, state-transition invariant, recovery owner và verification case."
    non_selection_guard: "Đặc tả ordering và replay behavior; không chọn partitioning, deduplication storage hoặc messaging technology."

  - id: "DR-Q05"
    trigger: "Tên hoặc contract của message có thể được hiểu là fact đã xảy ra hoặc instruction phải làm."
    question: "Contract đang báo một fact đã chấp nhận hay yêu cầu công việc, ai sở hữu outcome được yêu cầu, và rejection cùng retry được biểu diễn thế nào?"
    destination: "drivers (góc nhìn ta); input_issues.conflicting_drivers khi mơ hồ; handoff.to_dev"
    expected_evidence: "Contract intent, tense và semantics, outcome owner, rejection behavior, retry ownership và consumer expectation."
    non_selection_guard: "Tách semantics của fact và command; không chọn transport, queue, orchestration hoặc naming framework."

  - id: "DR-Q06"
    trigger: "Dữ liệu cache hoặc replicated tham gia đường nhạy cảm về correctness hoặc có effective date."
    question: "Source có thẩm quyền nào quyết correctness, bản sao được cũ tới đâu, và thay đổi theo effective time, invalidation cùng source unavailability được xử lý thế nào?"
    destination: "drivers (góc nhìn ta); handoff.to_dev; handoff.to_qc"
    expected_evidence: "Authority, freshness threshold hoặc lý do không có, effective-time key, invalidation rule, fallback và stale-data test."
    non_selection_guard: "Ghi authority và freshness constraint; không chọn cache product, key format, invalidation mechanism hoặc storage topology."

  - id: "DR-Q07"
    trigger: "Heavy processing, maintenance hoặc release activity có thể đụng business-critical operating window."
    question: "Window nào được bảo vệ, workload và error threshold nào áp dụng, ai có thể duyệt ngoại lệ, và cần rollback evidence gì?"
    destination: "drivers (góc nhìn ta); handoff.to_devops; handoff.to_qc"
    expected_evidence: "Protected window, workload baseline, error và rollback threshold, exception owner, observability signal và recovery test."
    non_selection_guard: "Ghi operating và rollout constraint; không chọn scheduler, deployment strategy, monitoring product hoặc platform."

  - id: "DR-Q08"
    trigger: "Một số hành động người dùng phải tiếp tục khi mất kết nối, còn hành động khác cần quyết định có thẩm quyền trực tuyến."
    question: "Hành động nào được capture offline, hành động nào cần online authority, và invariant về conflict, replay, user feedback cùng recovery là gì?"
    destination: "drivers (góc nhìn ta); handoff.to_dev; handoff.to_qc; handoff.to_devops"
    expected_evidence: "Action classification, authority boundary, offline duration, replay và conflict behavior, user feedback cùng recovery verification."
    non_selection_guard: "Xác định invariant offline và online; không chọn công nghệ local storage, synchronization, conflict resolution hoặc networking."

  - id: "DR-Q09"
    trigger: "Business rule thay đổi theo jurisdiction, policy version, product, tenant hoặc effective period."
    question: "Ai sở hữu rule, version và effective date được duyệt thế nào, và quyết định quá khứ được tái tạo theo rule có hiệu lực lúc đó ra sao?"
    destination: "drivers (góc nhìn sa); handoff.to_ba; handoff.to_dev; handoff.to_qc"
    expected_evidence: "Rule owner, approval authority, version, effective period, applicability scope, audit trail và historical-reproduction case."
    non_selection_guard: "Ghi lifecycle và audit obligation; không chọn rules engine, configuration schema, storage model hoặc administration interface."

  - id: "DR-Q10"
    trigger: "Record có validity interval có thể chồng lấn trên cùng business key."
    question: "Interval nào phải loại trừ lẫn nhau, boundary semantics nào áp dụng, và invariant được giữ thế nào khi write cùng lúc hay correction?"
    destination: "drivers (góc nhìn ta); handoff.to_dev; handoff.to_qc"
    expected_evidence: "Business key, interval inclusivity, permitted adjacency, correction rule, concurrency case và invariant verification."
    non_selection_guard: "Nêu temporal invariant và nghĩa vụ chứng minh; không chọn database constraint, transaction pattern, validation layer hoặc persistence model."
~~~

## Case routing đại diện

Các case này chứng minh routing, không phải một thiết kế đã chọn.

~~~yaml
representative_cases:
  - case: "data_authority"
    owner_lens: "sa"
    concern_or_invariant: "Mỗi loại dữ liệu dùng chung có đúng một thẩm quyền ghi; claim thiếu hoặc cạnh tranh vẫn tường minh."
    expected_evidence: "Ownership matrix, consumer bị ảnh hưởng, conflict owner và authority criterion đã chấp nhận."
    handoff: "DR-C01 và DR-C02; drivers; input_issues.contested_ownership; handoff.to_dev và handoff.to_qc"
    non_selection_guard: "Không gán hệ thống sở hữu, định nghĩa schema hoặc chọn cơ chế tích hợp."

  - case: "contested_resource_authority"
    owner_lens: "ta"
    concern_or_invariant: "Outcome single-winner có một quyết định có thẩm quyền và concurrency invariant kiểm chứng được."
    expected_evidence: "Contention scenario, quan sát của bên thắng và thua, retry behavior cùng concurrent verification."
    handoff: "DR-C03 và DR-Q01; drivers; handoff.to_dev và handoff.to_qc"
    non_selection_guard: "Không chọn công nghệ locking, coordination, database hoặc protocol."

  - case: "reconciliation"
    owner_lens: "ta"
    concern_or_invariant: "State qua ranh giới có convergence rule đo được, mismatch owner và correction path."
    expected_evidence: "Tổng hoặc population được so, cadence, tolerance, mismatch evidence và correction verification."
    handoff: "DR-C04 và DR-Q02; drivers; handoff.to_dev, handoff.to_qc và handoff.to_devops khi liên quan vận hành"
    non_selection_guard: "Không chọn sản phẩm batch, messaging, ledger hoặc reconciliation."

  - case: "compliance_timing"
    owner_lens: "sa"
    concern_or_invariant: "Điều kiện compliance và eligibility áp dụng được đánh giá trước khi commit."
    expected_evidence: "Authority có tên, effective date, case đủ và không đủ điều kiện, exception owner cùng audit trail."
    handoff: "DR-C11; drivers; handoff.to_ba, handoff.to_dev và handoff.to_qc"
    non_selection_guard: "Không chọn rule engine, workflow, schema hoặc enforcement component."

  - case: "lifecycle_retirement"
    owner_lens: "sa"
    concern_or_invariant: "Mọi capability và obligation sắp thu hồi có successor đã chấp nhận hoặc vẫn bị block."
    expected_evidence: "Inventory capability và consumer, successor owner, duty chưa giải quyết, rollback owner cùng exit criterion đo được."
    handoff: "DR-C12 và DR-C13; drivers; input_issues.missing_capability; stop_condition.pushed_to_s03; handoff.to_dev"
    non_selection_guard: "Không chọn replacement product, service boundary, migration design hoặc rollout model."

  - case: "offline_online_invariant"
    owner_lens: "ta"
    concern_or_invariant: "Offline capture và online authoritative decision được phân loại cùng behavior replay, conflict và recovery."
    expected_evidence: "Action classification, authority boundary, disconnection scenario, replay và conflict case cùng user feedback."
    handoff: "DR-Q08; drivers; handoff.to_dev, handoff.to_qc và handoff.to_devops"
    non_selection_guard: "Không chọn công nghệ local storage, synchronization, networking hoặc conflict resolution."
~~~

## Completion check

- Chỉ emit finding áp dụng, không bao giờ emit nguyên reference này.
- Giữ mọi output block bắt buộc ngay cả khi không có checklist entry nào áp dụng.
- Giữ SA và TA trong block ownership cùng driver-kind rule của mình.
- Cho mọi blocking finding một authority có tên, và mọi driver một verification cùng handoff.
- Đẩy lựa chọn, evidence, authority hoặc ownership chưa giải quyết vào issue hay handoff field hiện có
  tương ứng.
- Để lựa chọn giải pháp và model cho system-design và architecture-modeling.

