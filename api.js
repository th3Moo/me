import * as data from './data.js';

const MOCK_API_LATENCY = 500;

const simulateRequest = (resolveData, rejectMessage) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (rejectMessage) {
                reject({ message: rejectMessage });
            } else {
                resolve(resolveData);
            }
        }, MOCK_API_LATENCY);
    });
};

export const login = (email, password) => {
    if (email === 'user@test.com' && password === 'password123') {
        return simulateRequest({
            _id: 'user123',
            username: 'TestUser',
            email: 'user@test.com',
            token: 'jwt.mock.token.string'
        });
    }
    return simulateRequest(null, 'Invalid email or password.');
};

export const register = (username, email, password) => {
    if (!username || !email || !password) {
        return simulateRequest(null, 'All fields are required.');
    }
    if (email === 'user@test.com') {
        return simulateRequest(null, 'An account with this email already exists.');
    }
    return simulateRequest({
        _id: 'user456',
        username: username,
        email: email,
        token: 'jwt.mock.token.string.new'
    });
};

export const submitDeposit = (platform, amount, coupon) => {
    if (!platform || !amount) {
        return simulateRequest(null, "Platform and amount are required.");
    }
    if (amount < 1) {
        return simulateRequest(null, "Deposit amount must be at least $1.");
    }
    const message = `Deposit of $${amount} for ${platform} initiated successfully. ${coupon ? `Coupon '${coupon}' applied.` : ''} You will be redirected shortly.`;
    return simulateRequest({ message });
};


export const getHeroSlides = () => simulateRequest(data.heroSlides);
export const getPlatforms = () => simulateRequest(data.platforms);
export const getPromotions = () => simulateRequest(data.promotions);
export const getHotGames = () => simulateRequest(data.hotGames);
export const getRecentWinners = () => simulateRequest(data.recentWinners);
export const getFooterLinks = () => simulateRequest(data.footerLinks);
