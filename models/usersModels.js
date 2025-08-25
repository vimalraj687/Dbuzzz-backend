import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

 
const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true,      
      trim: true            
    },
    email: { 
      type: String, 
      required: true,       
      unique: true,        
      lowercase: true       
    },
    password: { 
      type: String, 
      required: true,       
      minlength: 6          
    }
  },
  { 
    timestamps: true        
  }
);

 
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();  

  const salt = await bcrypt.genSalt(10);             
  this.password = await bcrypt.hash(this.password, salt); 
  next();
});


userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

 
export default mongoose.model('User', userSchema);
