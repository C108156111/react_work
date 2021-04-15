import React from 'react';

class formatDate extends React.Component {
    constructor(props){
      super(props);
    }
    render(){
      return this.props.date.toLocaleDateString();
    }
  }
  
  class Avatar extends React.Component {
    constructor(props){
      super(props);
    }
    render(){
      return (
        <img
          className="Avatar"
          src={props.user.avatarUrl}
          alt={props.user.name}
        />
      );
    }
  }
  class UserInfo extends React.Component{
    constructor(props){
      super(props);
    }
    render(){
      return (
        <div className="UserInfo">
          <Avatar user={props.user} />
          <div className="UserInfo-name">{props.user.name}</div>
        </div>
      );
    }
  }
  class Comment extends React.Component {
    constructor(props){
      super(props);
    }
    render(){
      return (
        <div className="Comment">
          <UserInfo user={props.author} />
          <div className="Comment-text">{props.text}</div>
          <div className="Comment-date">
            {formatDate(props.date)}
          </div>
        </div>
      );
    }
  }
export default Comment;
