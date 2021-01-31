pragma solidity ^0.5.0;

contract TodoList {
    uint256 public taskCount = 0;

    // constructor() public {
    //     createTask("initialise create task todo list");
    //     createTask("Kick the Dog");
    //     createTask("buy burger");
    }

    struct Task {
        uint256 id;
        string content;
        bool completed;
    }
    mapping(uint256 => Task) public tasks;

    function createTask(string memory _content) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount, _content, false);
    }

    event TaskCompleted(uint256 id, bool completed);

    function toggleCompleted(uint256 _id) public {
        Task memory _task = tasks[_id];
        _task.completed = !_task.completed;
        tasks[_id] = _task;
        emit TaskCompleted(_id, _task.completed);
    }
}
