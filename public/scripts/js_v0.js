/**
 * Created by ruslan on 04.08.16.
 */


var model = {
  textInput: {
    all: []
  },
  count: 0,
};




var HtmlElementClassDoneAll = React.createClass({

  render: function () {
    return (
      <em id='doneAll' className='glyphicon glyphicon-ok'></em>
    );
  }

});

var ListClassDown = React.createClass({


  render: function () {
    var itemLeft;
    if (model.count > 1){
      itemLeft = model.count +' items left';
    }
else{
      itemLeft = model.count +' item left';
    }

    return (
      <li id="down_li">
        <div className="col-md-12">
          <span id="item_left">{itemLeft}</span>
          <span className="filter activeThis" id="all">All</span>
          <span className="filter" id="active">Active</span>
          <span className="filter" id="completed">Completed</span>
          <span id="ClearCompleted" style={{display: 'none'}}>ClearCompleted</span>
        </div>
      </li>
    );
  }
});

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




var TodoApp = React.createClass({


  getInitialState: function () {
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

    model.count++;
    return event.target.value = '';// строка ввода пуста
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


ReactDOM.render(
  <TodoApp />,
  document.getElementById('todoapp')
);



