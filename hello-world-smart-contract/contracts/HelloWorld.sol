pragma solidity ^0.4.0;
contract HelloWorld
{

	mapping (address => uint) balances;
	address public owner;

    //constructor runs once upon contract creation
    function HelloWorld()
    {
    	owner = msg.sender;
    	balances[owner] = 1000;
    }// end HelloWorld

    function transfer (address _to, uint _value) returns (bool success)
    {
    	if (balances[msg.sender] < _value)
    	{
    		return false;
    	}// end if

    	balances[msg.sender] -= _value;
    	balances[_to] += _value;
    	return true;

	}// end transfer 

    function getBalance(address _user) constant returns (uint _balance)
    {
    	return balances[_user];
    }// end getBalance

}// end contract HelloWorld