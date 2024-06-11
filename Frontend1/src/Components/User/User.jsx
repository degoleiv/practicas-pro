
import "./User.css";

export function User({ username, name }) {
  
  return (
    <article className="md-followCard">
      <section className="md-followCard-header">
        <img
          className="md-followCard-avatar"
          alt={username}
          src="src\assets\workingstudent.jpg"
        ></img>
        <strong className="md-followCard-userName">{name}</strong>
     
      </section>
    </article>
  );
}
