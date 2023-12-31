const express = require('express');
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
        const data = jwt.verify(token, process.env.TOKEN);
        req.user = data;
        next();
    } catch (error) {
        res.status(401).json({message: 'Invalid token'});
    }
}

module.exports = authenticateToken;