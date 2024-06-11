export function VideoPlayer({ src }) {
  return (
    <div>
      <video width="250" controls>
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}


