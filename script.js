/** @jsx React.DOM */

(function(env, React) {

  var C = env.C = {}; // components namespace



  var Email = C.Email = React.createClass({
    getInitialState: function() {
      return {
        email: this.props.email,
      };
    },

    render: function() {
      return (<li>
        <span class="display-name">{this.state.email}</span>
        <span class="click-to-delete">X</span>
      </li>);
    }
  });



  var Report = C.Report = React.createClass({
    getInitialState: function() {
      return {
        name: this.props.report.report_name,
        emails: this.props.report.emails,
      };
    },

    render: function() {
      var emails = this.state.emails.map(function(email, i) {
        return <Email email={email} key={i} />;
      });

      return (<div>
        <h3>{this.state.name}</h3>
        <ul>{emails}</ul>
      </div>);
    }
  });



  var ReportsContainer = C.ReportsContainer = React.createClass({
    render: function() {
      var reports = this.props.reports.map(function(report, i) {
        return <Report report={report} key={i} />;
      });
      return <div>{reports}</div>;
    }
  });



  var fetched_reports = [{
    report_name : "Alpha Campaign",
    emails      : [
      "harry@alpha.com",
      "hermoine@alpha.com",
      "ron@alpha.com",
    ],
  },
  {
    report_name : "Bravo Campaign",
    emails      : [
      "pete@bravo.com",
      "jordan@bravo.com",
      "paul@bravo.com",
      "vjeux@bravo.com",
    ],
  },
  {
    report_name : "Charlie Campaign",
    emails      : [
      "kevin@charlie.com",
      "dan@charlie.com",
      "brian@charlie.com",
    ],
  }];

  React.renderComponent(
    <ReportsContainer reports={fetched_reports} />,
    document.getElementById('app')
  );

})(window, React);
