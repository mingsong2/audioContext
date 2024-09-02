class Recorder {
    constructor(){
        this.audioContext = new AudioContext();
        this.audioProcesser = this.audioContext.createScriptProcessor([4096,1,1]);
        this.audioInput = null;
        this.audioProcesser.onaudioprocess = this.onaudioprocess;
    }
    // 获取二进制音频数据流
    onaudioprocess = (e) => {
        console.log("onaudioProcess", e.inputBuffer.getChannelData(0));
    }
    encodeWav = () => {
        
    }
    // 获取录音设备类型
    getDefaultDevice = () => {
        return new Promise((resolve) => {
            navigator.mediaDevices.enumerateDevices().then(devicesList => {
                devicesList = devicesList.filter(device => {
                    return device.kind == 'audioinput';
                })
                resolve(devicesList[0] || { deviceId: 'default' });
            });
        })
    }

    // 开始录音
    startRecord = async () => {
        var defaultDevice = await this.getDefaultDevice();
        navigator.getUserMedia({ audio: { deviceId: defaultDevice['deviceId'] } }, (stream) => {
            this.audioInput = this.audioContext.createMediaStreamSource(stream);
            this.audioInput.connect(this.audioProcesser);
            this.audioProcesser.connect(this.audioContext.destination);
        }, () => {

        })
    }
    // 停止录音
    stopRecord = () => {
        this.audioProcesser.disconnect();
    }
    
}   

export default Recorder;