const Notice = require("../model/Notice");

const createNotice = async(req, res) => {
    try {
        const noticeData = new Notice(req.body);

        if (!noticeData) {
            return res.status(404).json({ msg: "Notice data not found from body" });
        }
        const saveData = await noticeData.save();
        res.status(201).json({
            Success: true,
            Message: "Notice added successfully",
            Data: saveData,
        });

    } catch (error) {
        res.status(500).json({ error: error });
    }

}

const noticeList = async (req, res) => {
    try {
        const list = await Notice.find()
        return res.status(200).json({
            Message: "All Notice fetched successfully",
            Success: true,
            TotalCount: list.length,
            list: list,

        })
    } catch (error) {
        return res.status(400).json({ Success: false, Message: error.message })
    }
}

const deleteNotice = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Notice.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ Success: false, Message: " Notice not found!" });
        }

        res.status(200).json({ Success: true, Message: "Notice deleted successfully" });
    } catch (error) {
        return res.status(400).json({ Message: error.message, Success: false });
    }
};

module.exports = {createNotice, noticeList, deleteNotice};