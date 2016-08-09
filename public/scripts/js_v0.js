/**
 * Created by ruslan on 04.08.16.
 */


var model = [];




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


    function handleClickDone(event) {
      console.log(event.target.key);

    }


    var classElementList = model.map(function (key, index) {
      return <li className={"elementList "+key.active} >
        <div className="col-md-12 ">

          <span className="done" key={index} onClick={handleClickDone} ></span>

          <span className='textItem' >{key.textInput}</span>

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
      textInput: ''
    };


  },

  handleSubmit: function (event) {
    if (event.keyCode !== 13) {
      return;
    }
    event.preventDefault();

    var textInput = event.target.value;
    if (textInput === '') return;
          model.push({textInput: textInput,id: Date.now(),
      active: ''});

    console.log(model);

    this.setState({textInput: ''});


    return event.target.value = '';// строка ввода пуста
  },

  handleClick: function () {
    if (model.length)
      $('#itemList #down_li').remove();

  },

  render: function () {
    var main;
    var doneAll;
    var ulDown;
    if (model.length) {
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



