
var Hello = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});


ReactDOM.render(
  <Hello name="World world" />,
  document.getElementById('root')
);
