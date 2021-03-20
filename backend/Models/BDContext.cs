using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace backend.Models
{
    public partial class BDContext : DbContext
    {
        public BDContext()
        {
        }

        public BDContext(DbContextOptions<BDContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Menu> Menu { get; set; }
        public virtual DbSet<MenuOpcion> MenuOpcion { get; set; }
        public virtual DbSet<Permiso> Permiso { get; set; }
        public virtual DbSet<Rol> Rol { get; set; }
        public virtual DbSet<TbAdministrador> TbAdministrador { get; set; }
        public virtual DbSet<TbCategoria> TbCategoria { get; set; }
        public virtual DbSet<TbCliente> TbCliente { get; set; }
        public virtual DbSet<TbClienteDireccionEnvio> TbClienteDireccionEnvio { get; set; }
        public virtual DbSet<TbDetalleInventario> TbDetalleInventario { get; set; }
        public virtual DbSet<TbDetallePedido> TbDetallePedido { get; set; }
        public virtual DbSet<TbDireccionEnvio> TbDireccionEnvio { get; set; }
        public virtual DbSet<TbEmpleado> TbEmpleado { get; set; }
        public virtual DbSet<TbFactura> TbFactura { get; set; }
        public virtual DbSet<TbInformacionPersonal> TbInformacionPersonal { get; set; }
        public virtual DbSet<TbInventario> TbInventario { get; set; }
        public virtual DbSet<TbMarca> TbMarca { get; set; }
        public virtual DbSet<TbPais> TbPais { get; set; }
        public virtual DbSet<TbPedido> TbPedido { get; set; }
        public virtual DbSet<TbProducto> TbProducto { get; set; }
        public virtual DbSet<TbProveedor> TbProveedor { get; set; }
        public virtual DbSet<TbTipoEnvio> TbTipoEnvio { get; set; }
        public virtual DbSet<TbUnidadMedida> TbUnidadMedida { get; set; }
        public virtual DbSet<Usuario> Usuario { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {

                optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=amabisca;Username=postgres;Password=QRdffq4312");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Menu>(entity =>
            {
                entity.HasKey(e => e.cod_menu)
                    .HasName("menu_pkey");

                entity.ToTable("menu");

                entity.Property(e => e.cod_menu)
                    .HasColumnName("cod_menu")
                    .ValueGeneratedNever();

                entity.Property(e => e.enlace)
                    .HasColumnName("enlace")
                    .HasMaxLength(255);

                entity.Property(e => e.estado).HasColumnName("estado");

                entity.Property(e => e.icono)
                    .HasColumnName("icono")
                    .HasMaxLength(255);

                entity.Property(e => e.inicio).HasColumnName("inicio");

                entity.Property(e => e.nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasMaxLength(255);

                entity.Property(e => e.orden).HasColumnName("orden");
            });

            modelBuilder.Entity<MenuOpcion>(entity =>
            {
                entity.HasKey(e => e.cod_menu_opcion)
                    .HasName("menu_opcion_pkey");

                entity.ToTable("menu_opcion");

                entity.Property(e => e.cod_menu_opcion).HasColumnName("cod_menu_opcion");

                entity.Property(e => e.cod_menu).HasColumnName("cod_menu");

                entity.Property(e => e.enlace)
                    .IsRequired()
                    .HasColumnName("enlace")
                    .HasMaxLength(255);

                entity.Property(e => e.estado).HasColumnName("estado");

                entity.Property(e => e.nombre)
                    .HasColumnName("nombre")
                    .HasMaxLength(255);

                entity.Property(e => e.orden).HasColumnName("orden");

                
            });

            modelBuilder.Entity<Permiso>(entity =>
            {
                entity.HasKey(e => e.cod_permiso)
                    .HasName("permiso_pkey");

                entity.ToTable("permiso");

                entity.Property(e => e.cod_permiso).HasColumnName("cod_permiso");

                entity.Property(e => e.cod_menu_opcion).HasColumnName("cod_menu_opcion");

                entity.Property(e => e.cod_rol).HasColumnName("cod_rol");

                entity.Property(e => e.estado).HasColumnName("estado");

                entity.Property(e => e.fec_actualizacion)
                    .HasColumnName("fec_actualizacion")
                    .HasColumnType("date");

                entity.Property(e => e.fec_creacion)
                    .HasColumnName("fec_creacion")
                    .HasColumnType("date");

                

                
            });

            modelBuilder.Entity<Rol>(entity =>
            {
                entity.HasKey(e => e.cod_rol)
                    .HasName("rol_pkey");

                entity.ToTable("rol");

                entity.Property(e => e.cod_rol).HasColumnName("cod_rol");

                entity.Property(e => e.estado).HasColumnName("estado");

                entity.Property(e => e.nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasMaxLength(255);
            });

            modelBuilder.Entity<TbAdministrador>(entity =>
            {
                entity.HasKey(e => e.CodAdministrador)
                    .HasName("PK29_1");

                entity.ToTable("tb_administrador");

                entity.Property(e => e.CodAdministrador)
                    .HasColumnName("cod_administrador")
                    .ValueGeneratedNever();

                entity.Property(e => e.CodInformacionPersonal).HasColumnName("cod_informacion_personal");

                entity.Property(e => e.CodUsuario).HasColumnName("cod_usuario");

                entity.Property(e => e.EstadoActivo).HasColumnName("estado_activo");

                entity.Property(e => e.FechaCreacion)
                    .HasColumnName("fecha_creacion")
                    .HasColumnType("date");

                entity.HasOne(d => d.CodInformacionPersonalNavigation)
                    .WithMany(p => p.TbAdministrador)
                    .HasForeignKey(d => d.CodInformacionPersonal)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Reftb_informacion_personal34");

            }); 

            modelBuilder.Entity<TbCategoria>(entity =>
            {
                entity.HasKey(e => e.CodCategoria)
                    .HasName("PK16");

                entity.ToTable("tb_categoria");

                entity.Property(e => e.CodCategoria)
                    .HasColumnName("cod_categoria")
                    .ValueGeneratedNever();

                entity.Property(e => e.EstadoActivo).HasColumnName("estado_activo");

                entity.Property(e => e.NombreCategoria)
                    .HasColumnName("nombre_categoria")
                    .HasMaxLength(250);
            });

            modelBuilder.Entity<TbCliente>(entity =>
            {
                entity.HasKey(e => e.CodCliente)
                    .HasName("PK8_1");

                entity.ToTable("tb_cliente");

                entity.Property(e => e.CodCliente)
                    .HasColumnName("cod_cliente")
                    .ValueGeneratedNever();

                entity.Property(e => e.CodInformacionPersonal).HasColumnName("cod_informacion_personal");

                entity.Property(e => e.CodUsuario).HasColumnName("cod_usuario");

                entity.Property(e => e.EstadoActivo).HasColumnName("estado_activo");

                entity.Property(e => e.FechaCreacion)
                    .HasColumnName("fecha_creacion")
                    .HasColumnType("date");

                entity.HasOne(d => d.CodInformacionPersonalNavigation)
                    .WithMany(p => p.TbCliente)
                    .HasForeignKey(d => d.CodInformacionPersonal)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Reftb_informacion_personal27");

                
            });

            modelBuilder.Entity<TbClienteDireccionEnvio>(entity =>
            {
                entity.HasKey(e => e.CodClienteDireccionEnvio)
                    .HasName("PK15");

                entity.ToTable("tb_cliente_direccion_envio");

                entity.Property(e => e.CodClienteDireccionEnvio)
                    .HasColumnName("cod_cliente_direccion_envio")
                    .ValueGeneratedNever();

                entity.Property(e => e.CodCliente).HasColumnName("cod_cliente");

                entity.Property(e => e.CodDireccionEnvio).HasColumnName("cod_direccion_envio");

                entity.Property(e => e.EstadoActivo).HasColumnName("estado_activo");

                entity.HasOne(d => d.CodClienteNavigation)
                    .WithMany(p => p.TbClienteDireccionEnvio)
                    .HasForeignKey(d => d.CodCliente)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Reftb_cliente11");

                entity.HasOne(d => d.CodDireccionEnvioNavigation)
                    .WithMany(p => p.TbClienteDireccionEnvio)
                    .HasForeignKey(d => d.CodDireccionEnvio)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Reftb_direccion_envio12");
            });

            modelBuilder.Entity<TbDetalleInventario>(entity =>
            {
                entity.HasKey(e => e.CodDetalleInventario)
                    .HasName("PK20");

                entity.ToTable("tb_detalle_inventario");

                entity.Property(e => e.CodDetalleInventario)
                    .HasColumnName("cod_detalle_inventario")
                    .ValueGeneratedNever();

                entity.Property(e => e.CodInventario).HasColumnName("cod_inventario");

                entity.Property(e => e.CodProducto).HasColumnName("cod_producto");

                entity.Property(e => e.CodProveedor).HasColumnName("cod_proveedor");

                entity.Property(e => e.Stock).HasColumnName("stock");

                entity.HasOne(d => d.CodInventarioNavigation)
                    .WithMany(p => p.TbDetalleInventario)
                    .HasForeignKey(d => d.CodInventario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Reftb_inventario15");

                entity.HasOne(d => d.CodProductoNavigation)
                    .WithMany(p => p.TbDetalleInventario)
                    .HasForeignKey(d => d.CodProducto)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Reftb_producto18");

                entity.HasOne(d => d.CodProveedorNavigation)
                    .WithMany(p => p.TbDetalleInventario)
                    .HasForeignKey(d => d.CodProveedor)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Reftb_proveedor16");
            });

            modelBuilder.Entity<TbDetallePedido>(entity =>
            {
                entity.HasKey(e => e.CodDetallePedido)
                    .HasName("PK23");

                entity.ToTable("tb_detalle_pedido");

                entity.Property(e => e.CodDetallePedido)
                    .HasColumnName("cod_detalle_pedido")
                    .ValueGeneratedNever();

                entity.Property(e => e.Cantidad).HasColumnName("cantidad");

                entity.Property(e => e.CodPedido).HasColumnName("cod_pedido");

                entity.Property(e => e.CodProducto).HasColumnName("cod_producto");

                entity.HasOne(d => d.CodPedidoNavigation)
                    .WithMany(p => p.TbDetallePedido)
                    .HasForeignKey(d => d.CodPedido)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Reftb_pedido20");

                entity.HasOne(d => d.CodProductoNavigation)
                    .WithMany(p => p.TbDetallePedido)
                    .HasForeignKey(d => d.CodProducto)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Reftb_producto21");
            });

            modelBuilder.Entity<TbDireccionEnvio>(entity =>
            {
                entity.HasKey(e => e.CodDireccionEnvio)
                    .HasName("PK13");

                entity.ToTable("tb_direccion_envio");

                entity.Property(e => e.CodDireccionEnvio)
                    .HasColumnName("cod_direccion_envio")
                    .ValueGeneratedNever();

                entity.Property(e => e.Direccion)
                    .HasColumnName("direccion")
                    .HasMaxLength(250);
            });

            modelBuilder.Entity<TbEmpleado>(entity =>
            {
                entity.HasKey(e => e.CodEmpleado)
                    .HasName("PK29");

                entity.ToTable("tb_empleado");

                entity.Property(e => e.CodEmpleado)
                    .HasColumnName("cod_empleado")
                    .ValueGeneratedNever();

                entity.Property(e => e.CodInformacionPersonal).HasColumnName("cod_informacion_personal");

                entity.Property(e => e.CodUsuario).HasColumnName("cod_usuario");

                entity.Property(e => e.CodigoEmpleado)
                    .HasColumnName("codigo_empleado")
                    .HasMaxLength(100);

                entity.Property(e => e.EstadoActivo).HasColumnName("estado_activo");

                entity.Property(e => e.FechaCreacion)
                    .HasColumnName("fecha_creacion")
                    .HasColumnType("date");

                entity.HasOne(d => d.CodInformacionPersonalNavigation)
                    .WithMany(p => p.TbEmpleado)
                    .HasForeignKey(d => d.CodInformacionPersonal)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Reftb_informacion_personal33");

                
            });

            modelBuilder.Entity<TbFactura>(entity =>
            {
                entity.HasKey(e => e.CodFactura)
                    .HasName("PK27");

                entity.ToTable("tb_factura");

                entity.Property(e => e.CodFactura)
                    .HasColumnName("cod_factura")
                    .ValueGeneratedNever();

                entity.Property(e => e.CodPedido).HasColumnName("cod_pedido");

                entity.Property(e => e.NumeroFactura)
                    .HasColumnName("numero_factura")
                    .HasMaxLength(200);

                entity.HasOne(d => d.CodPedidoNavigation)
                    .WithMany(p => p.TbFactura)
                    .HasForeignKey(d => d.CodPedido)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Reftb_pedido25");
            });

            modelBuilder.Entity<TbInformacionPersonal>(entity =>
            {
                entity.HasKey(e => e.CodInformacionPersonal)
                    .HasName("PK28");

                entity.ToTable("tb_informacion_personal");

                entity.Property(e => e.CodInformacionPersonal)
                    .HasColumnName("cod_informacion_personal")
                    .ValueGeneratedNever();

                entity.Property(e => e.ApellidoPersona)
                    .HasColumnName("apellido_persona")
                    .HasMaxLength(250);

                entity.Property(e => e.CodPais).HasColumnName("cod_pais");

                entity.Property(e => e.Cui)
                    .HasColumnName("cui")
                    .HasMaxLength(18);

                entity.Property(e => e.Direccion)
                    .HasColumnName("direccion")
                    .HasMaxLength(250);

                entity.Property(e => e.ImagenPerfil)
                    .HasColumnName("imagen_perfil")
                    .HasMaxLength(250);

                entity.Property(e => e.Nit)
                    .HasColumnName("nit")
                    .HasMaxLength(250);

                entity.Property(e => e.NombrePersona)
                    .HasColumnName("nombre_persona")
                    .HasMaxLength(250);

                entity.Property(e => e.Telefono)
                    .HasColumnName("telefono")
                    .HasMaxLength(250);

                entity.HasOne(d => d.CodPaisNavigation)
                    .WithMany(p => p.TbInformacionPersonal)
                    .HasForeignKey(d => d.CodPais)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Reftb_pais26");
            });

            modelBuilder.Entity<TbInventario>(entity =>
            {
                entity.HasKey(e => e.CodInventario)
                    .HasName("PK19");

                entity.ToTable("tb_inventario");

                entity.Property(e => e.CodInventario)
                    .HasColumnName("cod_inventario")
                    .ValueGeneratedNever();

                entity.Property(e => e.EstadoActivo).HasColumnName("estado_activo");

                entity.Property(e => e.NombreInventario)
                    .HasColumnName("nombre_inventario")
                    .HasMaxLength(250);
            });

            modelBuilder.Entity<TbMarca>(entity =>
            {
                entity.HasKey(e => e.CodMarca)
                    .HasName("PK17");

                entity.ToTable("tb_marca");

                entity.Property(e => e.CodMarca)
                    .HasColumnName("cod_marca")
                    .ValueGeneratedNever();

                entity.Property(e => e.EstadoActivo).HasColumnName("estado_activo");

                entity.Property(e => e.NombreMarca)
                    .HasColumnName("nombre_marca")
                    .HasMaxLength(250);
            });

            modelBuilder.Entity<TbPais>(entity =>
            {
                entity.HasKey(e => e.CodPais)
                    .HasName("PK1_1");

                entity.ToTable("tb_pais");

                entity.Property(e => e.CodPais)
                    .HasColumnName("cod_pais")
                    .ValueGeneratedNever();

                entity.Property(e => e.Acronimo)
                    .HasColumnName("acronimo")
                    .HasMaxLength(10);

                entity.Property(e => e.EstadoActivo).HasColumnName("estado_activo");

                entity.Property(e => e.NomPais)
                    .HasColumnName("nom_pais")
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<TbPedido>(entity =>
            {
                entity.HasKey(e => e.CodPedido)
                    .HasName("PK22");

                entity.ToTable("tb_pedido");

                entity.Property(e => e.CodPedido)
                    .HasColumnName("cod_pedido")
                    .ValueGeneratedNever();

                entity.Property(e => e.CodCliente).HasColumnName("cod_cliente");

                entity.Property(e => e.CodClienteDireccionEnvio).HasColumnName("cod_cliente_direccion_envio");

                entity.Property(e => e.CodTipoEnvio).HasColumnName("cod_tipo_envio");

                entity.Property(e => e.EstadoEntrega)
                    .HasColumnName("estado_entrega")
                    .HasMaxLength(10);

                entity.Property(e => e.FechaPedido)
                    .HasColumnName("fecha_pedido")
                    .HasColumnType("date");

                entity.Property(e => e.MontoTotal)
                    .HasColumnName("monto_total")
                    .HasColumnType("numeric(10,2)");

                entity.Property(e => e.NumeroPedido)
                    .HasColumnName("numero_pedido")
                    .HasMaxLength(200);

                entity.HasOne(d => d.CodClienteNavigation)
                    .WithMany(p => p.TbPedido)
                    .HasForeignKey(d => d.CodCliente)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Reftb_cliente22");

                entity.HasOne(d => d.CodClienteDireccionEnvioNavigation)
                    .WithMany(p => p.TbPedido)
                    .HasForeignKey(d => d.CodClienteDireccionEnvio)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Reftb_cliente_direccion_envio23");

                entity.HasOne(d => d.CodTipoEnvioNavigation)
                    .WithMany(p => p.TbPedido)
                    .HasForeignKey(d => d.CodTipoEnvio)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Reftb_tipo_envio24");
            });

            modelBuilder.Entity<TbProducto>(entity =>
            {
                entity.HasKey(e => e.CodProducto)
                    .HasName("PK12");

                entity.ToTable("tb_producto");

                entity.Property(e => e.CodProducto)
                    .HasColumnName("cod_producto")
                    .ValueGeneratedNever();

                entity.Property(e => e.CodCategoria).HasColumnName("cod_categoria");

                entity.Property(e => e.CodMarca).HasColumnName("cod_marca");

                entity.Property(e => e.CodUnidadMedida)
                    .IsRequired()
                    .HasColumnName("cod_unidad_medida")
                    .HasMaxLength(10)
                    .IsFixedLength();

                entity.Property(e => e.CodigoProducto)
                    .HasColumnName("codigo_producto")
                    .HasMaxLength(250);

                entity.Property(e => e.DetalleProducto)
                    .HasColumnName("detalle_producto")
                    .HasMaxLength(250);

                entity.Property(e => e.EstadoActivo).HasColumnName("estado_activo");

                entity.Property(e => e.FechaCreacion)
                    .HasColumnName("fecha_creacion")
                    .HasColumnType("date");

                entity.Property(e => e.FechaModificacion)
                    .HasColumnName("fecha_modificacion")
                    .HasColumnType("date");

                entity.Property(e => e.ImagenProducto)
                    .HasColumnName("imagen_producto")
                    .HasMaxLength(250);

                entity.Property(e => e.NombreProducto)
                    .HasColumnName("nombre_producto")
                    .HasMaxLength(250);

                entity.Property(e => e.PrecioCosto)
                    .HasColumnName("precio_costo")
                    .HasColumnType("numeric(10,2)");

                entity.Property(e => e.PrecioVenta)
                    .HasColumnName("precio_venta")
                    .HasColumnType("numeric(10,2)");

                entity.Property(e => e.UsrModificacion).HasColumnName("usr_modificacion");

                entity.HasOne(d => d.CodCategoriaNavigation)
                    .WithMany(p => p.TbProducto)
                    .HasForeignKey(d => d.CodCategoria)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Reftb_categoria13");

                entity.HasOne(d => d.CodMarcaNavigation)
                    .WithMany(p => p.TbProducto)
                    .HasForeignKey(d => d.CodMarca)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Reftb_marca14");

                entity.HasOne(d => d.CodUnidadMedidaNavigation)
                    .WithMany(p => p.TbProducto)
                    .HasForeignKey(d => d.CodUnidadMedida)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Reftb_unidad_medida19");
            });

            modelBuilder.Entity<TbProveedor>(entity =>
            {
                entity.HasKey(e => e.CodProveedor)
                    .HasName("PK8");

                entity.ToTable("tb_proveedor");

                entity.Property(e => e.CodProveedor)
                    .HasColumnName("cod_proveedor")
                    .ValueGeneratedNever();

                entity.Property(e => e.ApellidoProveedor)
                    .HasColumnName("apellido_proveedor")
                    .HasMaxLength(250);

                entity.Property(e => e.CodPais).HasColumnName("cod_pais");

                entity.Property(e => e.Cui)
                    .HasColumnName("cui")
                    .HasMaxLength(250);

                entity.Property(e => e.EstadoActivo).HasColumnName("estado_activo");

                entity.Property(e => e.Nit)
                    .HasColumnName("nit")
                    .HasMaxLength(250);

                entity.Property(e => e.NombreProveedor)
                    .HasColumnName("nombre_proveedor")
                    .HasMaxLength(250);

                entity.HasOne(d => d.CodPaisNavigation)
                    .WithMany(p => p.TbProveedor)
                    .HasForeignKey(d => d.CodPais)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Reftb_pais6");
            });

            modelBuilder.Entity<TbTipoEnvio>(entity =>
            {
                entity.HasKey(e => e.CodTipoEnvio)
                    .HasName("PK26");

                entity.ToTable("tb_tipo_envio");

                entity.Property(e => e.CodTipoEnvio)
                    .HasColumnName("cod_tipo_envio")
                    .ValueGeneratedNever();

                entity.Property(e => e.CostoEnvio)
                    .HasColumnName("costo_envio")
                    .HasColumnType("numeric(10,2)");

                entity.Property(e => e.NombreTipoEnvio)
                    .HasColumnName("nombre_tipo_envio")
                    .HasMaxLength(250);
            });

            modelBuilder.Entity<TbUnidadMedida>(entity =>
            {
                entity.HasKey(e => e.CodUnidadMedida)
                    .HasName("PK21");

                entity.ToTable("tb_unidad_medida");

                entity.Property(e => e.CodUnidadMedida)
                    .HasColumnName("cod_unidad_medida")
                    .HasMaxLength(10)
                    .IsFixedLength();

                entity.Property(e => e.EstadoActivo)
                    .HasColumnName("estado_activo")
                    .HasMaxLength(10)
                    .IsFixedLength();

                entity.Property(e => e.NombreUnidadMedida)
                    .HasColumnName("nombre_unidad_medida")
                    .HasMaxLength(10)
                    .IsFixedLength();
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.cod_usuario)
                    .HasName("usuario_pkey");

                entity.ToTable("usuario");

                entity.Property(e => e.cod_usuario).HasColumnName("cod_usuario");

                entity.Property(e => e.cod_rol).HasColumnName("cod_rol");

                entity.Property(e => e.contrasenia).HasColumnName("contrasenia");

                entity.Property(e => e.correo_electronico)
                    .HasColumnName("correo_electronico")
                    .HasMaxLength(100);

                entity.Property(e => e.estado).HasColumnName("estado");

                entity.Property(e => e.fec_creacion)
                    .HasColumnName("fec_creacion")
                    .HasColumnType("date");

                entity.Property(e => e.nombre_completo)
                    .HasColumnName("nombre_completo")
                    .HasMaxLength(30);

                entity.Property(e => e.salt).HasColumnName("salt");

                entity.Property(e => e.token)
                    .HasColumnName("token")
                    .HasMaxLength(300);

                
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
