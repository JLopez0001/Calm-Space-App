import React, { useState, useEffect} from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const GoalSection = ({ goals, setGoals, objectives, setObjectives }) => {
    
    const [newGoal, setNewGoal] = useState('');
    const [newObjective, setNewObjective] = useState('');

    const handleAddGoalAndObjective = () => {
        if (newGoal.trim() !== '' && newObjective.trim() !== '') {
            // Update goals and objectives arrays using functional update form
            setGoals(prevGoals => [...prevGoals, newGoal]);
            setObjectives(prevObjectives => [...prevObjectives, newObjective]);
    
            // Clear input fields
            setNewGoal('');
            setNewObjective('');
        }
    };

    // This useEffect is optional and is just for logging.
    useEffect(() => {
        console.log("Goals:", goals);
        console.log("Objectives:", objectives);
    }, [goals, objectives]);

    return (
        <div>
            <Row className="note-section-header">
                <Container> Goals & Objectives </Container>
            </Row>
            <Form>
                {goals.map((goal, index) => (
                    <Row key={index}>
                        <Col>
                            <Form.Control required readOnly value={goal} />
                        </Col>
                        <Col>
                            <Form.Control required readOnly value={objectives[index]} />
                        </Col>
                    </Row>
                ))}
                <Row>
                    <Col>
                        <Form.Control
                            required
                            placeholder="Goal"
                            value={newGoal}
                            onChange={(e) => setNewGoal(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            required
                            placeholder="Objective"
                            value={newObjective}
                            onChange={(e) => setNewObjective(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row xs={6}>
                    <Button type="button" onClick={handleAddGoalAndObjective}>
                        Add New Input Field
                    </Button>
                </Row>
            </Form>
        </div>
    );
};

export default GoalSection;

