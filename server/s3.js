require('dotenv').config({ path: '../.env' });
const S3 = require('aws-sdk/clients/s3');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
    region, accessKeyId, secretAccessKey
});

function uploadToS3(file) {
    const param = {
        Bucket: bucketName,
        Key: file.originalname,
        Body: file.buffer
    };

    return s3.upload(param).promise();
}

module.exports = uploadToS3;
// uploads a file to s3

//downloads a file from s3