const Branch = require("../model/Branch");

const createBranch = async(req, res) => {
    try {
        const BranchData = new Branch(req.body);

        if (!BranchData) {
            return res.status(404).json({ msg: "Branch data not found from body" });
        }
        const saveData = await BranchData.save();
        res.status(201).json({
            Success: true,
            Message: "Branch added successfully",
            Data: saveData,
        });

    } catch (error) {
        res.status(500).json({ error: error });
    }

}

const branchList = async (req, res) => {
    try {
        const list = await Branch.find()
        return res.status(200).json({
            Message: "All Branch fetched successfully",
            Success: true,
            TotalCount: list.length,
            list: list,

        })
    } catch (error) {
        return res.status(400).json({ Success: false, Message: error.message })
    }
}
const deleteBranch = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Branch.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ Success: false, Message: " Branch not found!" });
        }

        res.status(200).json({ Success: true, Message: "Branch deleted successfully" });
    } catch (error) {
        return res.status(400).json({ Message: error.message, Success: false });
    }
};

module.exports = {createBranch, branchList,deleteBranch};