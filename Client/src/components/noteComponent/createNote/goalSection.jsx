import React, { useState, useEffect } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const GoalSection = ({ goals, setGoals, objectives, setObjectives, readOnly }) => {

    // TODO - fix the button to add new input fields
    
    const [newGoal, setNewGoal] = useState('');
    const [newObjective, setNewObjective] = useState('');

    const handleAddNewGoalAndObjective = () => {
        if (newGoal.trim() !== '' && !goals.includes(newGoal)) {
            setGoals(prevGoals => [...prevGoals, newGoal]);
        }
        if (newObjective.trim() !== '' && !objectives.includes(newObjective)) {
            setObjectives(prevObjectives => [...prevObjectives, newObjective]);
        }
        setNewGoal('');
        setNewObjective('');
    };

    return (
        <div>
            <Row>
                <Container className="note-header d-flex justify-content-center"> <h5>Goals & Objectives</h5></Container>
            </Row>
            <Form >
                {goals.map((goal, index) => (
                    <Row key={index}>
                        <Col className="d-flex justify-content-center">
                            <Form.Control readOnly value={goal} />
                        </Col>
                        <Col className="d-flex justify-content-center">
                            <Form.Control readOnly value={objectives[index] || ''} />
                        </Col>
                    </Row>
                ))}
                <Row>
                    <Col className="d-flex justify-content-center">
                        <Form.Control
                            style={{ width: '400px' }}
                            className="input-placeholder"
                            placeholder="Goal"
                            value={newGoal}
                            onChange={(e) => setNewGoal(e.target.value)}
                            readOnly={readOnly}
                        />
                    </Col>
                    <Col className="d-flex justify-content-center">
                        <Form.Control
                            style={{ width: '400px' }}
                            className="input-placeholder"
                            placeholder="Objective"
                            value={newObjective}
                            onChange={(e) => setNewObjective(e.target.value)}
                            readOnly={readOnly}
                        />
                    </Col>
                </Row>
                <Row xs={6}>
                {!readOnly && (
                    <Button className="buttons goal-button" type="button" onClick={handleAddNewGoalAndObjective}>
                        Add Goal & Objective To Note
                    </Button>
                )}
                </Row>
            </Form>
        </div>
    );
};

export default GoalSection;
