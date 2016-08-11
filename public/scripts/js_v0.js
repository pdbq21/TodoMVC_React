/**
 * Created by ruslan on 04.08.16.
 */
(function () {
  'use strict';

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
            <span id="ClearCompleted" onClick={this.props.onClickClear}>ClearCompleted</span>
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
        countActive: [],
        filter: 'all'
      };


    },

    componentDidUpdate: function () {
      if (this.state.countActive.length > 0){
        // document.getElementById('ClearCompleted').style.visibility = 'visible';
        $('#ClearCompleted').show();
      }
      else {
        //document.getElementById('ClearCompleted').style.visibility = 'hidden';

        $('#ClearCompleted').hide();
      }

      if (this.state.count === 0){
        $('#doneAll').css('color', '#999999');
      }
      else{
        $('#doneAll').css('color', '#D6D6D6');
      }
      this.filterElementId();

    },

    countItem: function () {


      this.state.count = model.length - this.state.countActive.length;


      this.setState({count: this.state.count});


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
      //this.filterElementId(document.getElementsByClassName('activeThis').id);
      /*if (this.state.filter === 'completed'){
       document.getElementsByClassName('elementList').lastChild.style.display = 'none';
       }*/

      this.countItem();
     // this.filterElementId();
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
     // this.filterElementId();

    },
    filterElementId: function(){
      var thisElementId =this.state.filter;
      $('.activeThis').removeClass("activeThis");
      /*document.getElementsByClassName("activeThis")[0].className =
        document.getElementsByClassName("activeThis")[0].className.replace("activeThis", "");*/

      function loopToFilter(filterNameHide, filterNameShow, addClass) {

        var idFilterHide = document.querySelectorAll(filterNameHide),
          idFilterShow = document.querySelectorAll(filterNameShow);
        $("#" + addClass).addClass("activeThis");



        //document.getElementById(addClass).className += " activeThis ";
        var i, length;
        for ( i = 0, length = idFilterHide.length; i < length; i++) {
          $(idFilterHide[i]).hide();
          //idFilterHide[i].style.display = 'none';
        }

        for ( i = 0, length = idFilterShow.length; i < length; i++) {
          //idFilterShow[i].style.display = 'flex';
          $(idFilterShow[i]).show();
        }
        if (filterNameShow === null) {
          idFilterShow = document.querySelectorAll('.elementList');
          for ( i = 0, length = idFilterShow.length; i < length; i++) {
            //idFilterShow[i].style.display = 'flex';
            $(idFilterShow[i]).show();
          }
          for ( i = 0, length = idFilterHide.length; i < length; i++) {
            //idFilterHide[i].style.display = 'none';
            $(idFilterHide[i]).hide();
          }


        }
      }

      switch (thisElementId) {
        case 'active':
          loopToFilter('.completed', null, thisElementId);
//.show()

          break;

        case 'completed' :

          loopToFilter('.elementList', '.completed', thisElementId);

          break;

        default:
          loopToFilter(null, '.elementList', thisElementId);
          break;
      }

    },

    handleClickFilter: function (elem) {






      this.state.filter = elem.target.attributes.getNamedItem('id').value;
      this.filterElementId();


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
          //$('#doneAll').css('color', '#999999');
          //document.getElementById('doneAll').style.color = '#999999';
        }
        else {
          index.active = '';
          self.state.countActive.splice(0, 1);
          //$('#doneAll').css('color', '#D6D6D6');
          //document.getElementById('doneAll').style.color = '#D6D6D6';
          // ClearCompleted();
        }
      });
      this.setState({active: ''});
      this.countItem();
      //this.filterElementId();
    },
    ClearCompleted: function(){

      model = model.filter(function(x) { return x.active === ''; });
      this.state.countActive.slice(0);
      this.setState({model: '', countActive: []});
      this.countItem();
      //this.filterElementId();

    },

    render: function () {
      var main,
        doneAll,
        ulDown;
      if (model.length ) {
        doneAll = (<HtmlElementClassDoneAll onClick={this.handleClickDoneAll}/>);

        main = (
          <ListClassElementList text={model} onClickDone={this.handleClickDone} onclickDelete={this.handleClickDelete}/>
        );
        ulDown = (<ListClassDown count={this.state.count} onClick={this.handleClickFilter} onClickClear={this.ClearCompleted}/>);

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


  ReactDOM.render(<TodoApp />,  document.getElementById('todoapp'));

})();


