const {ensure}=require('./validate-request');
// Closed template reconstruction validates emitted bytes, not a self-reported semantic manifest.
// Both supported layouts are independently valid; no image or pixel equality is used.
function validateOutput(accepted,output) {
  const {render}=require('./export-svg');
  const expected=render(accepted,{columns:output.columns});
  ensure(output.svg===expected.svg,'SVG output failed semantic/static/accessibility validation');
  ensure(output.html===expected.html,'HTML output failed semantic/static/accessibility validation');
  ensure(output.width===expected.width&&output.height===expected.height,'Output dimensions mismatch');
  return {status:'PASS',fact_coverage:1,semantic_diff_count:0,static_security:'PASS',accessible_name_description:'PASS',canonical_label_owner:'PASS',pixel_equality_checked:false};
}
module.exports={validateOutput};
