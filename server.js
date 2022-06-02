require('dotenv').config({ path: './config.env' });
const Joi = require('joi');
const express = require('express');
const app = express();
var { mongoose } = require('./db/mongoose');
const AgentRoutes = require('./routes/AgentRoutes');
const AgentIncentivesRoutes = require('./routes/AgentIncentivesRoutes');
const AgentCallDetailsRouter = require('./routes/AgentCallDetailsRoutes');
const TopPerformersRouter = require('./routes/TopPerformersRoutes');
const AgentIncentivesController = require('./controllers/AgentIncentivesController');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Leaderboard!');
});

// app.use('/leaderboard/clients', clientRoutes);
app.use('/leaderboard/agents', AgentRoutes);
app.use('/leaderboard/agent-incentives', AgentIncentivesRoutes);
app.use('/leaderboard/call-details', AgentCallDetailsRouter);
app.use('/leaderboard/top-performers', TopPerformersRouter);
app.use('/leaderboard/calculate', AgentIncentivesController.calculateAllIncentives);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
