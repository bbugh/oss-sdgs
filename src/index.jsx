// OpenSourceGoalsTable
//   -- SearchBar
//     -- GoalList
//       -- GoalItem
//   -- ProjectList
//     -- ProjectRow

var GoalItem = React.createClass({
  getInitialState: function() {
    return {active: false}
  },
  handleClick: function() {
    var active = !this.state.active
    this.setState({active: active});
    this.props.onStateChange({active: active, goal: this.props.goal});
  },
  render: function() {
    var image_state = (this.state.active) ? 'color' : 'grayscale';
    return (
      <img
        onClick={this.handleClick}
        className="goal_img"
        src={"images/" + this.props.image + "-" + image_state + ".jpg"}
        alt={this.props.goal} />
    );
  },
});

var GoalList = React.createClass({
  getInitialState: function() {
    return {selectedGoals: []};
  },
  selectGoal: function(goal) {
    var newGoals = this.state.selectedGoals.concat(goal);
    this.setState({selectedGoals: newGoals});
    return newGoals;
  },
  deselectGoal: function(goal) {
    var index = this.state.selectedGoals.indexOf(goal);
    var newGoals = this.state.selectedGoals.filter((x, i) => i != index );
    this.setState({selectedGoals: newGoals});
    return newGoals;
  },
  handleGoalStateChange: function(goalItem) {
    if (goalItem.active) {
      var newGoals = this.selectGoal(goalItem.goal)
    } else {
      var newGoals = this.deselectGoal(goalItem.goal);
    }
    this.props.onGoalsChanged(newGoals);
  },
  render: function() {
    var goalItemNodes = this.props.goals.map(function(goalData) {
      return (
        <GoalItem key={goalData.id}
          image={goalData.image} goal={goalData.goal}
          onStateChange={this.handleGoalStateChange} />
      );
    }.bind(this));
    return (
      <div className="goalList">
        {goalItemNodes}
      </div>
    );
  },
});

var SearchBar = React.createClass({
  getInitialState: function() {
    return {textQuery: '', goalsQuery: []}
  },
  handleQueryTextChange: function(e) {
    this.setState({textQuery: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var textQuery = this.state.textQuery.trim();
    var goalsQuery = this.state.goalsQuery.join('|');
    // console.log({textQuery: textQuery, goalsQuery: goalsQuery});
    // TODO: enable this to bubble submission up to main form for searching
    this.props.onSearch({textQuery: textQuery, goalsQuery: goalsQuery});
  },
  handleGoalsChange: function(goals) {
    this.setState({goalsQuery: goals});
  },
  render: function() {
    return (
      <div id="search_bar">
        <form onSubmit={this.handleSubmit}>
          <input type="text"
            placeholder="Enter search text..."
            value={this.state.textQuery}
            onChange={this.handleQueryTextChange}
            />
          <input type="submit"/>
        </form>
        <GoalList goals={this.props.goals} onGoalsChanged={this.handleGoalsChange} />
      </div>
    );
  },
});

var ProjectList = React.createClass({
  render: function() {
    return (
      <div>
        words
      </div>
    );
  },
});

var OpenSourceGoalsTable = React.createClass({
  handleSearch: function(params) {
    console.log("You did a search!")
    console.log(params);
  },
  render: function() {
    return (
      <div>
        <SearchBar onSearch={this.handleSearch} goals={this.props.goals} />
        <ProjectList projects={this.props.projects} />
      </div>
    );
  },
});

var sustainableGoals = [
  { id: 1, image: "sdg-icon-01", goal: "1. No Poverty" },
  { id: 2, image: "sdg-icon-02", goal: "2. Zero Hunger" },
  { id: 3, image: "sdg-icon-03", goal: "3. Good Health and Well-Being" },
  { id: 4, image: "sdg-icon-04", goal: "4. Quality Education" },
  { id: 5, image: "sdg-icon-05", goal: "5. Gender Equality" },
  { id: 6, image: "sdg-icon-06", goal: "6. Clean Water and Sanitation" },
  { id: 7, image: "sdg-icon-07", goal: "7. Affordable and Clean Energy" },
  { id: 8, image: "sdg-icon-08", goal: "8. Decent Work and Economic Growth" },
  { id: 9, image: "sdg-icon-09", goal: "9. Industry, Innovation and Infrastructure" },
  { id: 10, image: "sdg-icon-10", goal: "10. Reduced Inequalities" },
  { id: 11, image: "sdg-icon-11", goal: "11. Sustainable Cities and Communities" },
  { id: 12, image: "sdg-icon-12", goal: "12. Responsible Consumption and Production" },
  { id: 13, image: "sdg-icon-13", goal: "13. Climate Action" },
  { id: 14, image: "sdg-icon-14", goal: "14. Life Below Water" },
  { id: 15, image: "sdg-icon-15", goal: "15. Life on Land" },
  { id: 16, image: "sdg-icon-16", goal: "16. Peace, Justice and Strong Institutions" },
  { id: 17, image: "sdg-icon-17", goal: "17. Partnerships for the Goals" },
]

var projects = [{}]

ReactDOM.render(
  <OpenSourceGoalsTable projects={projects} goals={sustainableGoals} />,
  document.getElementById("container")
);
