<script>
import { ChatRoom } from './ChatRoomBase.js'

export default {
  extends: ChatRoom,
  mounted(){
    this.createCanvas(
      document.documentElement.clientWidth,
      document.documentElement.clientHeight-100
    )
  }
}
</script>