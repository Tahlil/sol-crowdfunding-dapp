use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod solcrowdfunding {
    use super::*;

    pub fn cerate(ctx: Context<Create>, name: String, description: String) -> Result<()> {
        let campaign  = &mut ctx.accounts.campaign;
        campaign.name = nanme;
        campaign.description = description;
        campaign.amount_donated = 0;
        campaign.amdmin = *ctx.accounts.user.key;
        Ok(())
    }
}

