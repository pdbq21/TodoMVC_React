/**
 * Created by ruslan on 11.08.16.
 */
var model = [], HtmlElementClassDoneAll = React.createClass({
  displayName: "HtmlElementClassDoneAll",
  render: function () {
    return React.createElement("em", {id: "doneAll", className: "glyphicon glyphicon-ok", onClick: this.props.onClick})
  }
}), ListClassDown = React.createClass({
  displayName: "ListClassDown", render: function () {
    return React.createElement("li", {id: "down_li"}, React.createElement("div", {className: "col-md-12"},
      React.createElement("span", {id: "item_left"}, 1 < this.props.count ? this.props.count + " items left" :
      this.props.count +
      " item left"), React.createElement("span", {
        className: "filter activeThis",
        id: "all",
        onClick: this.props.onClick
      }, "All"), React.createElement("span", {
        className: "filter",
        id: "active",
        onClick: this.props.onClick
      }, "Active"), React.createElement("span", {
        className: "filter",
        id: "completed",
        onClick: this.props.onClick
      }, "Completed"), React.createElement("span", {
        id: "ClearCompleted",
        onClick: this.props.onClickClear
      }, "ClearCompleted")))
  }
}), ListClassElementList = React.createClass({
  displayName: "ListClassElementList", render: function () {
    var a =
      this.props, b = a.text.map(function (b, g) {
      return React.createElement("li", {className: "elementList " + b.active}, React.createElement("div", {
        className: "col-md-12 "
      }, React.createElement("span", {
        className: "done",
        "data-reactid": g,
        onClick: a.onClickDone
      }), React.createElement("span", {className: "textItem"}, b.textInput), React.createElement("span", {
        className: "close glyphicon glyphicon-remove",
        "data-reactid": g,
        onClick: a.onclickDelete
      })))
    });
    return React.createElement("ul", {id: "itemList"}, b)
  }
}), TodoApp = React.createClass({
  displayName: "TodoApp",
  getInitialState: function () {
    return {model: [{textInput: "", active: ""}], count: 0, countActive: [], filter: "all"}
  }, countItem: function () {
    0 < this.state.countActive.length ? document.getElementById("ClearCompleted").style.visibility = "visible" :
      document.getElementById("ClearCompleted").style.visibility = "hidden";
    this.state.count = model.length - this.state.countActive.length;
    this.setState({count: this.state.count})
  }, handleSubmit: function (a) {
    if (13 === a.keyCode) {
      a.preventDefault();
      var b = a.target.value;
      if ("" !== b)return model.push({
        textInput: b,
        active: ""
      }), this.setState({textInput: ""}), this.filterElementId(), this.countItem(), a.target.value = ""
    }
  }, handleClickDone: function (a) {
    var b = a.target.attributes.getNamedItem("data-reactid").value;
    a = model[b];
    "completed" === model[b].active ? (this.state.countActive.splice(0, 1), b = "") :
      (this.state.countActive.push("active"), b = "completed");
    a.active = b;
    this.setState({active: ""});
    this.countItem();
    this.filterElementId()
  }, filterElementId: function () {
    function a(a, b, c) {
      a = document.querySelectorAll(a);
      var f = document.querySelectorAll(b);
      document.getElementById(c).className += " activeThis ";
      c = 0;
      for (var d = a.length; c < d; c++)a[c].style.display = "none";
      c = 0;
      for (d = f.length; c < d; c++)f[c].style.display = "flex";
      if (null === b) {
        f = document.querySelectorAll(".elementList");
        c = 0;
        for (d = f.length; c < d; c++)f[c].style.display = "flex";
        c = 0;
        for (d = a.length; c < d; c++)a[c].style.display = "none"
      }
    }

    var b = this.state.filter;
    document.getElementsByClassName("activeThis")[0].className =
      document.getElementsByClassName("activeThis")[0].className.replace("activeThis", "");
    switch (b) {
      case "active":
        a(".completed",
          null, b);
        break;
      case "completed":
        a(".elementList", ".completed", b);
        break;
      default:
        a(null, ".elementList", b)
    }
  }, handleClickFilter: function (a) {
    this.state.filter = a.target.attributes.getNamedItem("id").value;
    this.filterElementId()
  }, handleClickDelete: function (a) {
    a = a.target.attributes.getNamedItem("data-reactid").value;
    "" !== model[a].active && this.state.countActive.splice(0, 1);
    model.splice(a, 1);
    this.countItem()
  }, handleClickDoneAll: function () {
    var a = this;
    model.map(function (b) {
      if (0 !== a.state.count) {
        if ("completed" !==
          b.active) {
          var e;
          "completed" === b.active ? (a.state.countActive.splice(0, 1), e = "") :
            (a.state.countActive.push("active"), e = "completed");
          b.active = e;
          document.getElementById("doneAll").style.color = "#999999"
        }
      } else b.active = "", a.state.countActive.splice(0, 1), document.getElementById("doneAll").style.color = "#D6D6D6"
    });
    this.setState({active: ""});
    this.countItem()
  }, ClearCompleted: function () {
    model = model.filter(function (a) {
      return "" === a.active
    });
    this.state.countActive.slice(0);
    this.setState({model: "", countActive: []})
  },
  render: function () {
    var a, b, e;
    model.length && (b = React.createElement(HtmlElementClassDoneAll, {onClick: this.handleClickDoneAll}), a =
      React.createElement(ListClassElementList, {
        text: model,
        onClickDone: this.handleClickDone,
        onclickDelete: this.handleClickDelete
      }), e = React.createElement(ListClassDown, {
      count: this.state.count,
      onClick: this.handleClickFilter,
      onClickClear: this.ClearCompleted
    }));
    return React.createElement("div", {className: "container"}, React.createElement("div", {className: "row"},
      React.createElement("div",
        {className: "col-md-4"}), React.createElement("div", {className: "col-md-4"},
        React.createElement("h1", null, "todos"), React.createElement("form", {
          action: "",
          id: "inputForm"
        }, b, React.createElement("input", {
          type: "text",
          className: "form-control",
          placeholder: "What needs to be done?",
          onKeyDown: this.handleSubmit,
          onClick: this.handleClick
        }), a, e)), React.createElement("div", {className: "col-md-4"})))
  }
});
ReactDOM.render(React.createElement(TodoApp, null), document.getElementById("todoapp"));
