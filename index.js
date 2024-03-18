const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/bfhl', (req, res) => {
    try {
        // Extracting data from the request body
        const { array } = req.body;

        // User ID generation
        const userId = generateUserId('your_name', 'ddmmyyyy');

        // Processing the array
        const evenNumbers = [];
        const oddNumbers = [];
        const alphabetsUpperCase = [];
        array.forEach(item => {
            if (typeof item === 'number') {
                if (item % 2 === 0) {
                    evenNumbers.push(item);
                } else {
                    oddNumbers.push(item);
                }
            } else if (typeof item === 'string' && item.match(/[a-zA-Z]/)) {
                alphabetsUpperCase.push(item.toUpperCase());
            }
        });

        // Constructing the response
        const response = {
            user_id: userId,
            is_success: true,
            even_numbers: evenNumbers,
            odd_numbers: oddNumbers,
            uppercase_alphabets: alphabetsUpperCase
        };

        // Sending the response
        res.json(response);
    } catch (error) {
        // Handling exceptions
        res.status(500).json({ error: error.message });
    }
});

// Function to generate user ID
function generateUserId(fullName, dob) {
    const formattedDob = dob.replace(/-/g, '');
    return `${fullName}_${formattedDob}`;
}

// Starting the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
