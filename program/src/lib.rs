use solana_program::{
    program_error::ProgramError,
    account_info::{AccountInfo,next_account_info}, entrypoint, entrypoint::ProgramResult, msg, pubkey::Pubkey,
};
use std::cell::RefCell;
use std::rc::Rc;
use borsh::{BorshDeserialize, BorshSerialize};
//after solana-keygen new
//5zwi8GthH6vj3u7uQg9dTsbKSsaeVvseC4nwPLjD4eTy
//[183,24,219,158,145,227,59,153,68,209,188,54,95,47,59,131,223,143,101,3,35,208,224,128,111,66,113,241,221,62,215,202,74,70,182,171,100,140,55,222,82,240,81,41,113,181,17,113,99,181,56,144,64,245,12,189,86,144,95,175,105,33,29,136]
// program id-
//GoajUKZ1SjGBVu8uxaBcGJmdzbho7UyR9cyWTw3xz84E

//build program -
//cargo build-bpf --manifest-path=program/Cargo.toml --bpf-out-dir=dist/program
// deploy -
//solana program deploy /home/siddharth/WowLabz/Solana/nft-solana/dist/program/helloworld.so
#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct GreetingAccount {
    pub txt:String,
    
}
 entrypoint!(process_instruction);


fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    msg!("program id {:?}", program_id);
    for account in accounts {
     
    //     let mut greeting_account = GreetingAccount::try_from_slice(&account.data.borrow())?;
    //     let mut vec=Vec::new();
    //     vec.push(1);
    //    // greeting_account.id = instruction_data[1];
    //     greeting_account.serialize(&mut &mut account.data.borrow_mut()[..])?;
    //     msg!("accounts {:?}", account);
    let message = GreetingAccount::try_from_slice(instruction_data).map_err(|err| {
        msg!("Receiving message as string utf8 failed, {:?}", err);
        ProgramError::InvalidInstructionData  
      })?;
      msg!("Greeting passed to program is {:?}", message);
  
      let data = &mut &mut account.data.borrow_mut();
      msg!("Start save instruction into data");
      data[..instruction_data.len()].copy_from_slice(&instruction_data);

    }
    msg!("data {:?}", instruction_data);
    Ok(())
}


   // let  buf: &[u8] = &[0, 0, 0, 1];
    // let mut data= buf;
    // let my_ref=Rc::new(RefCell::new(&mut buf));
    // account.data= my_ref;