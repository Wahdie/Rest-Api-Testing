import mongodb from "mongodb"; 
import mongoose from "mongoose"; 
const MONGO_URL = "mongodb://127.0.0.1:27017/contactmu"

mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error) => {
      console.error('Koneksi MongoDB gagal:', error);
});

export default mongoose;