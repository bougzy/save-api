// const express = require('express');
// const mongoose = require('mongoose');
// const path = require('path');
// const fs = require('fs');
// const multer = require('multer');
// const cors = require('cors');


// const app = express();


// // Connect to MongoDB
// mongoose.connect('mongodb+srv://tap:tap@tap.6bl8xah.mongodb.net/tap', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));

// // Middleware
// app.use(cors({
//   origin: ['http://localhost:5174', 'https://savealife-rouge.vercel.app'] // Allow requests from both origins
// }));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // Models

// // ContactMessage model
// const ContactMessageSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   message: {
//     type: String,
//     required: true,
//   },
// });

// const ContactMessage = mongoose.model('ContactMessage', ContactMessageSchema);

// // Donation model
// const donationSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   media: {
//     type: String, // This will store the file path (image or video)
//     required: true,
//   },
//   mediaType: {
//     type: String, // 'image' or 'video'
//     required: true,
//   },
// });

// const Donation = mongoose.model('Donation', donationSchema);

// // Subscriber model
// const SubscriberSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
// });

// const Subscriber = mongoose.model('Subscriber', SubscriberSchema);

// // Set up multer for file uploads (with memory storage)
// const storage = multer.memoryStorage(); // Use memory storage if not saving files locally
// const upload = multer({ storage: storage });

// // Routes

// // Route to handle donation form submission
// app.post('/api/donations', upload.single('media'), async (req, res) => {
//   try {
//     const mediaType = req.file.mimetype.startsWith('image') ? 'image' : 'video';
//     const newDonation = new Donation({
//       title: req.body.title,
//       description: req.body.description,
//       media: req.file.buffer.toString('base64'), // Store file as base64 string
//       mediaType,
//     });
//     await newDonation.save();
//     res.status(201).json({ message: 'Donation submitted successfully!' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Route to get all donations
// app.get('/api/donations', async (req, res) => {
//   try {
//     const donations = await Donation.find();
//     res.json(donations);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Route to handle subscription form submission
// app.post('/api/subscribe', async (req, res) => {
//   try {
//     const newSubscriber = new Subscriber({
//       email: req.body.email,
//     });
//     await newSubscriber.save();
//     res.status(201).json({ message: 'Subscription successful!' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Route to handle contact form submission
// app.post('/api/contact', async (req, res) => {
//   try {
//     const newContactMessage = new ContactMessage({
//       name: req.body.name,
//       email: req.body.email,
//       message: req.body.message,
//     });
//     await newContactMessage.save();
//     res.status(201).json({ message: 'Message sent successfully!' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Serve HTML files
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'views', 'index.html'));
// });

// app.get('/form', (req, res) => {
//   res.sendFile(path.join(__dirname, 'views', 'form.html'));
// });

// app.get('/donation', (req, res) => {
//   res.sendFile(path.join(__dirname, 'views', 'donation.html'));
// });

// app.get('/about', (req, res) => {
//   res.sendFile(path.join(__dirname, 'views', 'about.html'));
// });

// app.get('/programs', (req, res) => {
//   res.sendFile(path.join(__dirname, 'views', 'programs.html'));
// });

// app.get('/involved', (req, res) => {
//   res.sendFile(path.join(__dirname, 'views', 'involved.html'));
// });

// app.get('/contact', (req, res) => {
//   res.sendFile(path.join(__dirname, 'views', 'contact.html'));
// });

// // Route to delete a donation by ID
// app.delete('/api/donations/:id', async (req, res) => {
//   try {
//     const donation = await Donation.findById(req.params.id);
//     if (!donation) {
//       return res.status(404).json({ message: 'Donation not found' });
//     }

//     // Remove donation from the database
//     await Donation.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: 'Donation deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Route to update a donation by ID
// app.put('/api/donations/:id', upload.single('media'), async (req, res) => {
//   try {
//     const { title, description } = req.body;
//     const donation = await Donation.findById(req.params.id);

//     if (!donation) {
//       return res.status(404).json({ message: 'Donation not found' });
//     }

//     // Update title and description
//     donation.title = title;
//     donation.description = description;

//     // Update media if a new file is provided
//     if (req.file) {
//       donation.media = req.file.buffer.toString('base64');
//       donation.mediaType = req.file.mimetype.startsWith('image') ? 'image' : 'video';
//     }

//     await donation.save();
//     res.status(200).json({ message: 'Donation updated successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Start server
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const cors = require('cors');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://tap:tap@tap.6bl8xah.mongodb.net/tap', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Middleware
app.use(cors({
  origin: ['http://localhost:5174', 'https://savealife-rouge.vercel.app'] // Allow requests from both origins
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Models

// ContactMessage model
const ContactMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const ContactMessage = mongoose.model('ContactMessage', ContactMessageSchema);

// Donation model
const donationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  media: {
    type: String, // This will store the file path (image or video)
    required: true,
  },
  mediaType: {
    type: String, // 'image' or 'video'
    required: true,
  },
});

const Donation = mongoose.model('Donation', donationSchema);

// Subscriber model
const SubscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const Subscriber = mongoose.model('Subscriber', SubscriberSchema);

// Set up multer for file uploads (with memory storage)
const storage = multer.memoryStorage(); // Use memory storage if not saving files locally
const upload = multer({ storage: storage });

// Routes

// Route to handle donation form submission
app.post('/api/donations', upload.single('media'), async (req, res) => {
  try {
    const mediaType = req.file.mimetype.startsWith('image') ? 'image' : 'video';
    const newDonation = new Donation({
      title: req.body.title,
      description: req.body.description,
      media: req.file.buffer.toString('base64'), // Store file as base64 string
      mediaType,
    });
    await newDonation.save();
    res.status(201).json({ message: 'Donation submitted successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get all donations
app.get('/api/donations', async (req, res) => {
  try {
    const donations = await Donation.find();
    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to handle subscription form submission
app.post('/api/subscribe', async (req, res) => {
  try {
    const newSubscriber = new Subscriber({
      email: req.body.email,
    });
    await newSubscriber.save();
    res.status(201).json({ message: 'Subscription successful!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to handle contact form submission
app.post('/api/contact', async (req, res) => {
  try {
    const newContactMessage = new ContactMessage({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });
    await newContactMessage.save();
    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve plain text greeting message
app.get('/', (req, res) => {
  res.send('Hello, the server is running!');
});

// Serve HTML files
app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'form.html'));
});

app.get('/donation', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'donation.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get('/programs', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'programs.html'));
});

app.get('/involved', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'involved.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

// Route to delete a donation by ID
app.delete('/api/donations/:id', async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    // Remove donation from the database
    await Donation.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Donation deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to update a donation by ID
app.put('/api/donations/:id', upload.single('media'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    // Update title and description
    donation.title = title;
    donation.description = description;

    // Update media if a new file is provided
    if (req.file) {
      donation.media = req.file.buffer.toString('base64');
      donation.mediaType = req.file.mimetype.startsWith('image') ? 'image' : 'video';
    }

    await donation.save();
    res.status(200).json({ message: 'Donation updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




