import { Socket } from "phoenix"

export default class EditorSocket {
    constructor() {
        this.socket = new Socket("/socket", {})
        this.socket.connect()
    }

    connect() {
        this.setup_editor()
        this.setup_channel()
        this.channel.on("entry", entry => {
            this.quill.setContents(entry.body.ops)
        });
    }

    setup_channel() {
        this.channel = this.socket.channel("editor:1", {})
        this.channel.join()
            .receive("ok", resp => {
                console.log("Joined successfully", resp)
                this.fetch_entry()
            })
            .receive("error", resp => { console.log("Unable to join", resp) })
    }

    setup_editor() {
        this.quill = new Quill('#editor', {
            theme: 'snow',
            placeholder: 'What did you do today?'
        });

        this.quill.on('text-change', (delta, oldDelta, source) => {
            if (source == 'api') {
                console.log("An API call triggered this change.");
            } else if (source == 'user') {
                console.log("A user action triggered this change.");
                this.channel.push("text_change", { body: this.quill.getContents() })
            }
        });
    }

    fetch_entry() {
        this.channel.push("entry", { id: 1 })
    }
}