<script>
import { ChatRoom } from './ChatRoomBase.js'

export default {
  extends: ChatRoom,

  mounted(){
    this.createCanvas()
  }
}
</script>