/**
 * Created by ruslan on 04.08.16.
 */

/****************** Model **************************/
var model = {
  textInput: {
    all: [],
    active: [],
    completed: []
  },
  count: 0,
  activeThis: 1
};


/**************** end Model **************************/
/**************** View **********************/
var HtmlElementClassDoneAll = React.createClass({

  render: function () {


    return (
      <em id='doneAll' className='glyphicon glyphicon-ok'></em>
    );
  }

});
// value = # item/-s left / module.count = this.#
var ListClassDown = React.createClass({
  render: function () {

    return (
      <li id="down_li">
        <div className="col-md-12">
          <span id="item_left"></span>
          <span className="filter activeThis" id="all">All</span>
          <span className="filter" id="active">Active</span>
          <span className="filter" id="completed">Completed</span>
          <span id="ClearCompleted" style={{display: 'none'}}>ClearCompleted</span>
        </div>
      </li>
    );
  }
});
/*
 var ListClassElementListSpanTextItem = React.createClass({

 render: function () {
 return (
 { model.textInput.all.map(function(textInput, index){
 <span className="textItem" key={ index }>{this.props.value}</span>//це значення має бути рівним даним з обєкта
 // { model.textInput.all.map(function(textInput, index){
 // return <span key={ index }>{textInput}</span>
 //})}
 );
 }

 });*/

var ListClassElementList = React.createClass({

  render: function () {

    var classElementList = model.textInput.all.map(function (textInput, index) {
      return <li className="elementList">
        <div className="col-md-12 ">
          <span className="done"></span>

          <span className='textItem' key={ index }>{textInput}</span>

          <span className="close glyphicon glyphicon-remove"></span>
        </div>
      </li>


    });

    return <ul id="itemList">{classElementList}</ul>;
  }
});
/*
 var ItemList = React.createClass({

 render: function(){
 return (
 <ul id="itemList">
 <ListClassElementList />
 <ListClassDown />
 </ul>
 );
 }
 });*/

/*
 var TodoAppClassContainer = React.createClass({

 render: function(){

 return (
 <div className="container">
 <div className="row">
 <div className="col-md-4"></div>
 <div className="col-md-4">
 <h1>todos</h1>
 <form action="" id="inputForm">

 <input type="text" className="form-control" placeholder="What needs to be done?"
 onChange={this.handleChange}
 onKeyDown={this.handleSubmit}
 />
 </form>
 </div>
 <div className="col-md-4"></div>
 </div>
 </div>

 );

 }

 });*/
/*
 var Hello = React.createClass({
 render: function() {
 var names = ['Jake', 'Jon', 'Thruster'];// model.textInput.all;
 return (
 <ul>
 {names.map(function(name, index){       // { model.textInput.all.map(function(textInput, index){
 return <li key={ index }>{name}</li>; // return <span key={ index }>{textInput}</span>
 })}                                     // })}
 </ul>
 )
 }
 });
 */

/****************** View end ****************************/
/*************** Control ***********************************/


/************* Control end ************************************/


var TodoApp = React.createClass({


  getInitialState: function () {
// show textInput.all , input.val() === '' ,
    //

    return {
      model: {textInput: {all: []}}
    };


  },

  handleSubmit: function (event) {
    if (event.keyCode !== 13) {
      return;
    }
    event.preventDefault();

    var textInput = event.target.value;
    if (textInput === '') return;
    model.textInput.all.push(textInput);
    console.log(model.textInput.all);

    this.setState({model: {textInput: {all: []}}});


    return event.target.value = '';// строка ввода пуста
  },

  handleChange: function (event) {
    var textInput = event.target.value;

  },
  handleClick: function () {
    if (model.textInput.all.length)
      $('#itemList #down_li').remove();

  },

  render: function () {

    var main;
    var doneAll;
    var ulDown;
    if (model.textInput.all.length) {
      doneAll = (<HtmlElementClassDoneAll />);

      main = (
        <ListClassElementList />
      );
      ulDown = (<ListClassDown />);

    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <h1>todos</h1>
            <form action="" id="inputForm">
              {doneAll}
              <input type="text" className="form-control" placeholder="What needs to be done?"
                     onChange={this.handleChange}
                     onKeyDown={this.handleSubmit}
                     onClick={this.handleClick}
              />
              {main}
              {ulDown}
            </form>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    );
  }
});

//console.log(model.textInput.all[0]);

ReactDOM.render(
  <TodoApp />,
  document.getElementById('todoapp')
);



