import { CallRecording, CallRecordingList } from "@stream-io/video-react-sdk";

const RecordingStream = ({
  recordings,
}: {
  recordings: CallRecording[] | undefined;
}) => {
  return <CallRecordingList callRecordings={recordings as CallRecording[]} />;
};

export default RecordingStream