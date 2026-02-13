module.exports = async function (context, req) {
    context.res = {
        status: 200,
        body: JSON.stringify({
            received: req.body || null,
            message: "Function executed"
        })
    };
};
