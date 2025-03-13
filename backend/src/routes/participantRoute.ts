import express from "express";
import * as service from "../services/participantService";
const router = express.Router();

router.get("/", async (req, res) => {
    if (req.query.pageSize && req.query.pageNo) {
        const pageSize = parseInt(req.query.pageSize as string) || 3;
        const pageNo = parseInt(req.query.pageNo as string) || 1;

        try {
            const result = await service.getAllParticipantsWithPagination(pageSize, pageNo);
            res.setHeader("x-total-count", result.count.toString());
            res.setHeader("Access-Control-Expose-Headers", "x-total-count");
            res.json(result.participants);
        } catch (error) {
            if ((error as Error).message === "No participant found.") {
                res.status(404).send("No participant found");
                return;
            } else if (pageNo < 1 || pageSize < 1) {
                res.status(400).send("Invalid pageNo or pageSize");
            } else {
                res.status(500).send("Internal Server Error");
            }
            return;
        } finally {
            console.log(`Request is completed. with pageNo=${pageNo} and pageSize=${pageSize}`);
        }

    } else {
        res.json(await service.getAllParticipants());
    }
});


router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const participant = await service.getParticipantById(id);
    if (participant) {
        res.json(participant);
    } else {
        res.status(404).send("Participant not found");
    }
});

export default router;