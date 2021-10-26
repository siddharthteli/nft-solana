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
    pub tokenid: u32,
    
}
 entrypoint!(process_instruction);
// fn process_instruction(
//     program_id: &Pubkey,
//     accounts: &[AccountInfo],
//     instruction_data: &[u8],
// ) -> ProgramResult {
//     msg!("program id {:?}", program_id);
//     let accounts_iter = &mut accounts.iter();
//     let account = next_account_info(accounts_iter)?;
//         msg!("accounts {:?}", account.data.borrow());
//         if account.owner != program_id {
//             msg!("Greeted account does not have the correct program id");
//             return Err(ProgramError::IncorrectProgramId);
//         }
//     // let mut greeting_account = GreetingAccount::try_from_slice(&account.data.borrow())?;
//     // greeting_account.counter += 1;
//     // greeting_account.serialize(&mut &mut account.data.borrow_mut()[..])?;
//     // msg!("Greeted {} time(s)!", greeting_account.counter);
//     // msg!("Testtime(s)!");
// //     let my_ref=Rc::new(RefCell::new(& mut vec![2]));
// //    let container= account.data.borrow_mut();
// //    container.
//   // let test= my_ref.borrow_mut();
   
//    //stest.take();
//    //test.borrow();
//   //  *account.data= &mut Rc::new(RefCell::new(&mut  vec![45]));   
    
//     msg!("data {:?}", instruction_data);
//     Ok(())
// }


fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    msg!("program id {:?}", program_id);
    for account in accounts {
        let mut greeting_account = GreetingAccount::try_from_slice(&account.data.borrow())?;
        greeting_account.tokenid += 1;
        greeting_account.serialize(&mut &mut account.data.borrow_mut()[..])?;
        msg!("accounts {:?}", account);

    }
    msg!("data {:?}", instruction_data);
    Ok(())
}