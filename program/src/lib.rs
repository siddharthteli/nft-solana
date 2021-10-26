use solana_program::{
    account_info::AccountInfo, entrypoint, entrypoint::ProgramResult, msg, pubkey::Pubkey,
};

//after solana-keygen new
//5zwi8GthH6vj3u7uQg9dTsbKSsaeVvseC4nwPLjD4eTy
//[183,24,219,158,145,227,59,153,68,209,188,54,95,47,59,131,223,143,101,3,35,208,224,128,111,66,113,241,221,62,215,202,74,70,182,171,100,140,55,222,82,240,81,41,113,181,17,113,99,181,56,144,64,245,12,189,86,144,95,175,105,33,29,136]
// program id-
//GoajUKZ1SjGBVu8uxaBcGJmdzbho7UyR9cyWTw3xz84E
entrypoint!(process_instruction);
fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    msg!("program id {:?}", program_id);
    for account in accounts {
        msg!("accounts {:?}", account);
    }
    msg!("data {:?}", instruction_data);
    Ok(())
}
