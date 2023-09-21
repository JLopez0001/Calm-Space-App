import React, { useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const GoalSection = () => {
    const [goals, setGoals] = useState([]);
    const [objectives, setObjectives] = useState([]);
    const [newGoal, setNewGoal] = useState('');
    const [newObjective, setNewObjective] = useState('');

    const handleAddGoalAndObjective = () => {
        if (newGoal.trim() !== '' && newObjective.trim() !== '') {
            // Update goals and objectives arrays
            setGoals([...goals, newGoal]);
            setObjectives([...objectives, newObjective]);

            // Clear input fields
            setNewGoal('');
            setNewObjective('');
        }
    };

    return (
        <div>
            <Row className="note-section-header">
                <Container> Goals & Objectives </Container>
            </Row>
            <Form>
                {goals.map((goal, index) => (
                    <Row key={index}>
                        <Col>
                            <Form.Control readOnly value={goal} />
                        </Col>
                        <Col>
                            <Form.Control readOnly value={objectives[index]} />
                        </Col>
                    </Row>
                ))}
                <Row>
                    <Col>
                        <Form.Control
                            placeholder="Goal"
                            value={newGoal}
                            onChange={(e) => setNewGoal(e.target.value)}
                        />
                    </Col>

                    <Col>
                        <Form.Control
                            placeholder="Objective"
                            value={newObjective}
                            onChange={(e) => setNewObjective(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row xs={6}>
                    <Button type="button" onClick={handleAddGoalAndObjective}>
                        Add Goal and Objective
                    </Button>
                </Row>
            </Form>
        </div>
    )
};

export default GoalSection;
