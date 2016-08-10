/**
 * Created by ruslan on 04.08.16.
 */


var model = [];


var HtmlElementClassDoneAll = React.createClass({

  render: function () {
    return (
      <em id='doneAll' className='glyphicon glyphicon-ok' onClick={this.props.onClick}></em>
    );
  }

});

var ListClassDown = React.createClass({


  render: function () {
    var countItemText;
    if (this.props.count > 1) {
      countItemText = this.props.count + ' items left';
    }
    else {
      countItemText = this.props.count + ' item left';
    }
    return (
      <li id="down_li">
        <div className="col-md-12">
          <span id="item_left">{countItemText}</span>
          <span className="filter activeThis" id="all" onClick={this.props.onClick}>All</span>
          <span className="filter" id="active" onClick={this.props.onClick}>Active</span>
          <span className="filter" id="completed" onClick={this.props.onClick}>Completed</span>
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
      return <li className={"elementList " + key.active}>
        <div className="col-md-12 ">

          <span className="done" data-reactid={index} onClick={props.onClickDone}></span>

          <span className='textItem'>{key.textInput}</span>

          <span className="close glyphicon glyphicon-remove" data-reactid={index} onClick={props.onclickDelete}></span>
        </div>
      </li>


    });

    return <ul id="itemList">{classElementList}</ul>;
  }
});


var TodoApp = React.createClass({


  getInitialState: function () {
    return {
      model: [{
        textInput: '',
        active: ''
      }
      ],
      count: 0,
      countActive: []
    };


  },

  handleSubmit: function (event) {
    if (event.keyCode !== 13) {
      return;
    }
    event.preventDefault();

    var textInput = event.target.value;
    if (textInput === '') return;
    model.push({
      textInput: textInput,
      active: ''
    });
    this.setState({textInput: ''});
    this.countItem();
    return event.target.value = '';// строка ввода пуста
  },

  handleClickDone: function (event) {//event
    var self = this;
    var dataId = event.target.attributes.getNamedItem('data-reactid').value;// $().attr()
    model[dataId].active = 'completed' === model[dataId].active ?
      (function () {
        self.state.countActive.splice(0, 1);

        return ''
      })() :
      (function () {
        self.state.countActive.push('active');
        return 'completed'
      })();

    this.setState({active: ''});
    this.countItem();

  },

  countItem: function () {
    this.state.count = model.length - this.state.countActive.length;

    this.setState({count: this.state.count});

  },
  handleClickFilter: function (elem) {


    document.getElementsByClassName("activeThis")[0].className =
      document.getElementsByClassName("activeThis")[0].className.replace("activeThis", "");


    function loopToFilter(filterNameHide, filterNameShow, addClass) {

      var idFilterHide = document.querySelectorAll(filterNameHide),
        idFilterShow = document.querySelectorAll(filterNameShow);

      document.getElementById(addClass).className += " activeThis ";

      for (var i = 0, length = idFilterHide.length; i < length; i++) {
        idFilterHide[i].style.display = 'none';
      }

      for (var i = 0, length = idFilterShow.length; i < length; i++) {
        idFilterShow[i].style.display = 'flex';
      }
      if (filterNameShow === null) {
        var idFilterShow = document.querySelectorAll('.elementList');
        for (var i = 0, length = idFilterShow.length; i < length; i++) {
          idFilterShow[i].style.display = 'flex';
        }
        for (var i = 0, length = idFilterHide.length; i < length; i++) {
          idFilterHide[i].style.display = 'none';
        }


      }
    }

    var thisElementId = elem.target.attributes.getNamedItem('id').value;
    switch (thisElementId) {
      case 'active':
        loopToFilter('.completed', null, thisElementId);

        break;

      case 'completed' :

        loopToFilter('.elementList', '.completed', thisElementId);

        break;

      default:
        loopToFilter(null, '.elementList', thisElementId);
        break;
    }


  },

  handleClickDelete: function (event) {

    var dataId = event.target.attributes.getNamedItem('data-reactid').value;
    if (model[dataId].active !== '') {
      this.state.countActive.splice(0, 1);
    }
    model.splice(dataId, 1);

    this.countItem();
  },


  handleClickDoneAll: function () {


    var self = this;
model.map(function (index) {
  if (self.state.count !== 0 ) {
    if (index.active === 'completed') return;

    index.active = 'completed' === index.active ?
      (function () {
        self.state.countActive.splice(0, 1);

        return ''
      })() :
      (function () {
        self.state.countActive.push('active');
        return 'completed'
      })();
  }
  else {
    index.active = '';
    self.state.countActive.splice(0, 1);
  }
});
    this.setState({active: ''});
    this.countItem();

  },
  render: function () {
    var main;
    var doneAll;
    var ulDown;
    if (model.length) {
      doneAll = (<HtmlElementClassDoneAll onClick={this.handleClickDoneAll}/>);

      main = (
        <ListClassElementList text={model} onClickDone={this.handleClickDone} onclickDelete={this.handleClickDelete}/>
      );
      ulDown = (<ListClassDown count={this.state.count} onClick={this.handleClickFilter}/>);

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



