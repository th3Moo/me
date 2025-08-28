export const heroSlides = [
    {
        imageUrl: "placeholder/bitbetwin-new-bg-dektop-1.webp",
        title: "UNLEASH THE FUN",
        subtitle: "Experience the Best in Online Gaming",
        buttonText: "Join Now",
    },
    {
        imageUrl: "placeholder/slide-2-bonus-desktop-version.webp",
        title: "DAILY BONUSES",
        subtitle: "Get More chances to Win Every Single Day",
        buttonText: "Claim Bonus",
    },
    {
        imageUrl: "placeholder/bitbetwin-3rd-slide-desktop.webp",
        title: "HUGE JACKPOTS",
        subtitle: "Play for Massive Prizes and Life-Changing Wins",
        buttonText: "Play Now",
    },
];

export const platforms = [
    { name: "Vegas-X", imageUrl: "placeholder/vegas-x-logo-300.webp" },
    { name: "Riversweeps", imageUrl: "placeholder/riversweeps-logo-300.webp" },
    { name: "Skillmine", imageUrl: "placeholder/skillmine-logo-300.webp" },
    { name: "Ice8", imageUrl: "placeholder/ice8-logo-300.webp" },
    { name: "Juwa", imageUrl: "placeholder/juwa-logo-300.webp" },
    { name: "Game Vault", imageUrl: "placeholder/game-vault-logo-300.webp" },
    { name: "Milky Way", imageUrl: "placeholder/milky-way-logo-300.webp" },
    { name: "Orion Stars", imageUrl: "placeholder/orion-stars-logo-300.webp" },
    { name: "Fire Kirin", imageUrl: "placeholder/fire-kirin-logo-300.webp" },
    { name: "Ultra Panda", imageUrl: "placeholder/ultra-panda-logo-300.webp" },
    { name: "Vblink", imageUrl: "placeholder/vblink-logo-300.webp" },
    { name: "Vpower", imageUrl: "placeholder/vpower-logo-300.webp" },
];

export const promotions = [
    { title: 'Happy Hour', imageUrl: 'https://r2.flowith.net/files/o/1756339695520-big_wang_happy_hour_banner_index_1@1024x1024.png', description: '30% bonus on all deposits' },
    { title: 'Welcome Bonus', imageUrl: 'https://r2.flowith.net/files/o/1756339701407-big_wang_welcome_bonus_promotion_index_2@1024x1024.png', description: '50% bonus for 1st deposit' },
    { title: '25% Bonus', imageUrl: 'https://new-bitbetwin.fra1.digitaloceanspaces.com/PROD/uploads/25.png', description: 'Get 25% on your second and third deposits' },
    { title: 'Cashback', imageUrl: 'https://new-bitbetwin.fra1.digitaloceanspaces.com/PROD/uploads/cashback.png', description: 'Get a 20% cashback' },
    { title: 'Referral Bonus', imageUrl: 'https://new-bitbetwin.fra1.digitaloceanspaces.com/PROD/uploads/referal.png', description: 'Invite a friend, get a $20 bonus' },
    { title: 'Weekly Bonus', imageUrl: 'https://new-bitbetwin.fra1.digitaloceanspaces.com/PROD/uploads/weeklybonus.png', description: 'Every week a special bonus' }
];

export const hotGames = [
    { name: 'Billy\\\\'s Game', imageUrl: 'https://new-bitbetwin.fra1.digitaloceanspaces.com/PROD/uploads/billysgame.png', platform: 'Vegas-X' },
    { name: 'Rich Life', imageUrl: 'https://new-bitbetwin.fra1.digitaloceanspaces.com/PROD/uploads/richlife.png', platform: 'Riversweeps' },
    { name: 'Vegas7', imageUrl: 'https://new-bitbetwin.fra1.digitaloceanspaces.com/PROD/uploads/vegas7.png', platform: 'Skillmine' },
    { name: 'God of Wealth', imageUrl: 'https://new-bitbetwin.fra1.digitaloceanspaces.com/PROD/uploads/godofwealth.png', platform: 'Ice8' },
    { name: 'Buffalo 777', imageUrl: 'https://new-bitbetwin.fra1.digitaloceanspaces.com/PROD/uploads/buffalo777.png', platform: 'Juwa' },
    { name: 'Lucky Duck', imageUrl: 'https://new-bitbetwin.fra1.digitaloceanspaces.com/PROD/uploads/luckyduck.png', platform: 'Game Vault' },
    { name: 'Space Rocks', imageUrl: 'https://new-bitbetwin.fra1.digitaloceanspaces.com/PROD/uploads/spacerocks.png', platform: 'Milky Way' },
    { name: 'Golden Dragon', imageUrl: 'https://new-bitbetwin.fra1.digitaloceanspaces.com/PROD/uploads/goldendragon.png', platform: 'Orion Stars' }
];

export const recentWinners = [
    { username: 'PlayerX', amount: 250, game: 'Buffalo 777' },
    { username: 'AceHigh', amount: 180, game: 'Rich Life' },
    { username: 'LadyLuck', amount: 500, game: 'God of Wealth' },
    { username: 'JackpotJoe', amount: 75, game: 'Billy\\\\'s Game' },
    { username: 'CasinoQueen', amount: 320, game: 'Vegas7' },
    { username: 'SpinMaster', amount: 95, game: 'Lucky Duck' },
    { username: 'Winner22', amount: 150, game: 'Space Rocks' },
    { username: 'BigWinz', amount: 450, game: 'Golden Dragon' },
    { username: 'TheGambler', amount: 210, game: 'Buffalo 777' },
    { username: 'ReelKing', amount: 120, game: 'Rich Life' }
];

export const footerLinks = {
    pages: [
        { name: 'About Us', href: '#about-us' },
        { name: 'Promotions', href: '#promotions' },
        { name: 'Games', href: '#hot-games' },
        { name: 'Blog', href: '#' },
    ],
    software: platforms.slice(0, 4).map(p => ({ name: p.name, href: '#' })),
    promotions: promotions.slice(0, 4).map(p => ({ name: p.title, href: '#' })),
};
