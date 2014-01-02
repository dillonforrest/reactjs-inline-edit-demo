/** @jsx React.DOM */

var TestUtils = React.addons.ReactTestUtils;
var mock_data = [{
  report_name : "Test Alpha Campaign",
  emails      : [
    "harry@test.com",
    "hermoine@test.com",
    "ron@test.com",
  ],
},
{
  report_name : "Test Bravo Campaign",
  emails      : [
    "pete@test.com",
    "jordan@test.com",
    "paul@test.com",
    "vjeux@test.com",
  ],
},
{
  report_name : "Test Charlie Campaign",
  emails      : [
    "kevin@test.com",
    "dan@test.com",
    "brian@test.com",
  ],
}];

describe("`C` namespace", function() {
  it("contains a key/val pair for each component", function() {
    expect(C).toBeDefined();
    expect(C.ReportsContainer).toBeDefined();
    expect(C.Report).toBeDefined();
  });
});


describe("`ReportsContainer` component", function() {

  it("creates a report for each report it's given", function() {
    var Container = C.ReportsContainer;
    var container = <Container reports={mock_data} />;

    TestUtils.renderIntoDocument(container);

    var children = container._renderedComponent.props.children;

    expect(children.length).toBe(3);

    children.forEach(function(child, i) {
      var correctType = TestUtils.isCompositeComponentWithType(
        child, C.Report );
      expect(correctType).toBe(true);
      expect(child.props.report.emails).toBe(mock_data[i].emails);
      expect(child.props.report.report_name).toBe(mock_data[i].report_name);
    });
  });

});


describe("`Report` component", function() {
  var report;
  var report_data;

  beforeEach(setup);

  it("renders report name", function() {
    expect(report.state.name).toBe("Report Name");
  });

  it("creates an Email component for each email", function() {
    var children = report._renderedComponent.props.children;
    var subComponents = children[1].props.children;

    expect(children.length).toBe(2);

    subComponents.forEach(function(child, i) {
      var correctType = TestUtils.isCompositeComponentWithType(
        child, C.Email);
      expect(correctType).toBe(true);
      expect(child.props.email).toBe(report_data.emails[i]);
    });
  });

  function setup() {
    var Report = C.Report;
    report_data = {
      report_name: "Report Name",
      emails: ["first", "second"],
    };
    report = <Report report={report_data} />;

    TestUtils.renderIntoDocument(report);
  }
});


describe("`Email` component", function() {
  var email;
  var email_prop = "Original Email";

  beforeEach(setup);

  it("renders the email", function() {
    expect(email.state.email).toBe(email_prop);
  });

  function setup() {
    var Email = C.Email;
    email = <Email email={email_prop} />;

    TestUtils.renderIntoDocument(email);
  }
});
