use solana_program::{
    program_error::ProgramError,
    account_info::{AccountInfo,next_account_info}, entrypoint, entrypoint::ProgramResult, msg, pubkey::Pubkey,
};
use std::cell::RefCell;
use std::rc::Rc;
use borsh::{BorshDeserialize, BorshSerialize};


//Data schema to store in account data field.
#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct GreetingAccount {
    pub txt:String,
    
}
 entrypoint!(process_instruction);

//Program id will be provided from client.Moslty deployed program id. 
//accounts is array we can store data to but some might not be writable.
//Instruction_data is provided by client .
fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    msg!("program id {:?}", program_id);
    //For now there is only one account .
    for account in accounts {
        //Reading instruction_data
    let message = GreetingAccount::try_from_slice(instruction_data).map_err(|err| {
        msg!("Receiving message as string utf8 failed, {:?}", err);
        ProgramError::InvalidInstructionData  
      })?;
      msg!("Greeting passed to program is {:?}", message);
      //Reading account data field.
      let data = &mut &mut account.data.borrow_mut();
      msg!("Start save instruction into data");
      //Updating account data field with instruction data .
      data[..instruction_data.len()].copy_from_slice(&instruction_data);

    }
    msg!("data {:?}", instruction_data);
    Ok(())
}
