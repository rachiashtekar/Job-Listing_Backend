const jwt = require("jsonwebtoken");
const UserModel = require("../../server/Models/UserModel");
const JobListing = require("../../server/Models/JobListingModel");

const profileController = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const userInfo = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID
    const user = await UserModel.findById(userInfo._id);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const { name, email, phone, image } = user;

    // Call getUserJobs to get job listings for the user
    const jobListingsResponse = await getUserJobs(req);

    // Check if there was an error in fetching job listings
    if (jobListingsResponse.error) {
      throw new Error(jobListingsResponse.error);
    }

    // Extract jobListings from the response
    const { jobListings } = jobListingsResponse;

    res.status(200).json({ name, email, phone, image, jobListings });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const getUserJobs = async (req) => {
  try {
    const token = req.headers.authorization;
    const userId = jwt.verify(token, process.env.JWT_SECRET);
    const { skills, searchTerm } = req.query;

    const filter = {};
    if (skills) filter.skillsRequired = { $in: skills.split(",") };
    if (searchTerm) filter.jobPosition = new RegExp(searchTerm, "i");
    filter.userId = userId; // Add userId filter

    // Find job listings that match the filter
    const jobListings = await JobListing.find(filter);

    return { jobListings }; // Return jobListings in an object
  } catch (error) {
    return { error: error.message }; // Return error in an object
  }
};

module.exports = {
  profileController,
  getUserJobs,
};
