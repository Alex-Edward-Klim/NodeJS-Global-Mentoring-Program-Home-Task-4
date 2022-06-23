import 'dotenv/config';
import app from './app';

const PORT = process.env.PORT || 3031;

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
