/**
 * file that defines the schema for mongoose
 */
module.exports = mongoose => {
    const likeanangel = mongoose.model(
        "likeanangle",
        mongoose.Schema(
            {
                section: String,
                item: String,
                price: String,
                title: Number,
                published: Boolean
        },
        { timestamps: true }
      )
    );
  
    return likeanangel;
  };