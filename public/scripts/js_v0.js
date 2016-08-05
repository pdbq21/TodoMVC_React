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
var HtmlElementClassDoneAll =React.createClass({

  render: function(){


    return (
      <em id='doneAll' className='glyphicon glyphicon-ok'></em>
    );
  }

});

var ListClassDown = React.createClass({
  render: function(){

    return (
      <li id="down_li">
        <div className="col-md-12">
          <span id="item_left" value={}></span> // value = # item/s left / module.count = this
          <span className="filter activeThis" id="all">All</span>
          <span className="filter" id="active">Active</span>
          <span className="filter" id="completed">Completed</span>
          <span id="ClearCompleted" style="display: none;">ClearCompleted</span>
        </div>
      </li>
    );
  }
});

var ListClassElementList = React.createClass({

  render: function () {
    return (

      <li className="elementList">
        <div className="col-md-12 ">
          <span className="done"></span>
          <span className="textItem" value={}></span>//це значення має бути рівним даним з обєкта

          <span className="close glyphicon glyphicon-remove"></span>
        </div>
      </li>
    );
  }
});

var ItemList = React.createClass({

render: function(){
  return (
  <ul id="itemList">
    <ListClassElementList />
    <ListClassDown />
  </ul>
  );
}
});


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

});

/****************** View end ****************************/
/*************** Control ***********************************/



/************* Control end ************************************/


var TodoApp = React.createClass({

 getInitialState: function() {

   return {}
  },

  handleSubmit: function(event){
    if (event.keyCode !== 13) {
      return;
    }
    event.preventDefault();

    var textInput = event.target.value;
    model.textInput.all.push(textInput);

  },

  handleChange: function (event) {
var textInput = event.target.value;

  },

  render: function () {
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
                     value=''
              />
            </form>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    );
  }
});



ReactDOM.render(
<TodoApp />,
  document.getElementById('todoapp')
);



