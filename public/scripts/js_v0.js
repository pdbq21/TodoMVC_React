/**
 * Created by ruslan on 04.08.16.
 */

var TodoApp = React.createClass({
  render: function () {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <h1>todos</h1>
            <form action="" id="inputForm">
              <input type="text" className="form-control" placeholder="What needs to be done?"/>
            </form>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    );
  }
});

var InputApp = React.createClass({


  render: function(){


    return (
      <input type="text" className="form-control" placeholder="What needs to be done?"/>
    );
  }

});
var HtmlTagTodoApp = {

  HTMLTagUl: "<ul id='itemList'>%date%</ul>",
  HTMLdoneAll: "<em id='doneAll' class='glyphicon glyphicon-ok'></em>",
  HTMLTag_down_ul: "<li id='down_li'><div class='col-md-12'>" +
  "<span id='item_left'></span><span class='filter activeThis' id='all'>All</span>" +
  "<span class='filter' id='active' >Active</span>" +
  "<span class='filter' id='completed' >Completed</span>" +
  "<span id='ClearCompleted'>ClearCompleted</span>" +
  "</div></li>",
  HTMLTag_li: "<li class='elementList'><div class='col-md-12 '>" +
  "<span class='done'>" +
  "</span><span class='textItem'>%date%" +
  "</span><span class='close glyphicon glyphicon-remove'>" +
  "</span>" +
  "</div></li>"


};
/*
var FormBox = React.createClass({
  loadItemListFromServer: function(){
$.ajax({
  url: this.props.url,
  dataType: 'json',
  cache: false,
  success: function(data){
    this.setState({data: data});

  }.blink(this)

})


  },

  render: function(){

    return ();

  }


});*/

ReactDOM.render(
<TodoApp url="/api/itemObject" pollInterval={2000} />,
  document.getElementById('todoapp')
);



