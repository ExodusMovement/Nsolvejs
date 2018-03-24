
module.exports = function(A, B) {
    return A.x - A.y * (B.x - A.x) / (B.y - A.y);
};
