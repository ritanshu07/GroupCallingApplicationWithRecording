import { connect } from 'react-redux';
import GroupCall, { GroupCallProps } from '../components/GroupCall';
import { setMicrophone } from '../core/sideEffects';
import { setVideoDeviceInfo, setAudioDeviceInfo } from '../core/actions/devices';
import { AudioDeviceInfo, VideoDeviceInfo } from '@azure/communication-calling';
import { State } from '../core/reducers';
import { bannerVisible, dialogBoxVisible } from 'core/actions/calls';

const mapStateToProps = (state: State, props: GroupCallProps) => ({
  userId: state.sdk.userId,
  callAgent: state.calls.callAgent,
  deviceManager: state.devices.deviceManager,
  group: state.calls.group,
  screenWidth: props.screenWidth,
  call: state.calls.call,
  shareScreen: state.controls.shareScreen,
  mic: state.controls.mic,
  groupCallEndReason: state.calls.groupCallEndReason,
  isGroup: (): boolean | undefined =>
    state.calls.call && state.calls.call.direction !== 'Incoming' && !!state.calls.group,
  remoteParticipants: state.calls.remoteParticipants,
  callState: state.calls.callState,
  localVideo: state.controls.localVideo,
  screenShareStreams: state.streams.screenShareStreams,
  videoDeviceInfo: state.devices.videoDeviceInfo,
  audioDeviceInfo: state.devices.audioDeviceInfo,
  videoDeviceList: state.devices.videoDeviceList,
  audioDeviceList: state.devices.audioDeviceList,
  cameraPermission: state.devices.cameraPermission,
  microphonePermission: state.devices.microphonePermission,
  recordingStatus: state.calls.recordingStatus,
  recordingId: state.calls.recordingId,
  bannerVisiblilty: state.calls.bannerVisible,
  recordingError: state.calls.recordingError,
  isDialogBoxVisiblile: state.calls.dialogBoxVisible
});

const mapDispatchToProps = (dispatch: any) => ({
  mute: (): void => dispatch(setMicrophone(false)),
  setAudioDeviceInfo: (deviceInfo: AudioDeviceInfo): void => {
    dispatch(setAudioDeviceInfo(deviceInfo));
  },
  setVideoDeviceInfo: (deviceInfo: VideoDeviceInfo): void => {
    dispatch(setVideoDeviceInfo(deviceInfo));
  },
  setBannerVisiblilty: (bannerVisibilty: boolean) => dispatch(bannerVisible(bannerVisibilty)),
  dialogBoxVisiblilty: (dialogBoxVisibilty: boolean) => dispatch(dialogBoxVisible(dialogBoxVisibilty))
});

const connector: any = connect(mapStateToProps, mapDispatchToProps);
export default connector(GroupCall);
