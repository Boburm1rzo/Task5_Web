type Props = { src: string };

export default function AudioPlayer({ src }: Props) {
  return (
    <audio className="w-full" controls src={src}>
      Your browser does not support audio.
    </audio>
  );
}
