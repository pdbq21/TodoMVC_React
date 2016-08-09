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
    return (
      <li id="down_li">
        <div className="col-md-12">
          <span id="item_left">{console.log(this.props.count)}</span>
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


var props = this.props;

    var classElementList = props.text.map(function (key, index) {
      return <li className={"elementList "+key.active} >
        <div className="col-md-12 ">

          <span className="done" data-reactid={index} onClick={props.onClickDone} ></span>

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
    return {model : [{
      textInput: '',
      active: ''
    }
    ],
      count: 0

    };


  },

  handleSubmit: function (event) {
   console.log(this.state.count +' items left');
    if (event.keyCode !== 13) {
      return;
    }
    event.preventDefault();

    var textInput = event.target.value;
    if (textInput === '') return;
          model.push({textInput: textInput,
      active: ''});
    this.setState({textInput: ''});


    return event.target.value = '';// строка ввода пуста
  },

  handleClick: function () {
    if (model.length)
      $('#itemList #down_li').remove();

  },
  handleClickDone: function(event){//event

    var dataId = event.target.attributes.getNamedItem('data-reactid').value;// $().attr()

    model[dataId].active = 'completed' === model[dataId].active? '' : 'completed';

this.setState({active: ''})
  },

  countItem: function () {

   var countCompleted = $('.completed').size();
    this.state.count = model.textInput.length-1 - countCompleted;
    this.setState({count: 0});
    if (this.state.count > 1){
      return this.state.count +' items left';
    }
    else{
      return this.state.count +' item left';
    }



  },

  render: function () {
    var main;
    var doneAll;
    var ulDown;
    if (model.length) {
      doneAll = (<HtmlElementClassDoneAll />);

      main = (
        <ListClassElementList text={model} onClickDone={this.handleClickDone} />
      );
      ulDown = (<ListClassDown count={this.countItem} />);

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



